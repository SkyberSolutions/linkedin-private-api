import { filter, get, keyBy, map } from 'lodash';

import { Client } from '../core/client';
import { COMPANY_TYPE, LinkedInCompany } from '../entities/linkedin-company.entity';
import { LinkedInMiniProfile, MINI_PROFILE_TYPE } from '../entities/linkedin-mini-profile.entity';
import { LinkedInProfile, PROFILE_TYPE } from '../entities/linkedin-profile.entity';
import { LinkedInVectorImage } from '../entities/linkedin-vector-image.entity';
import { MiniProfile, ProfileId } from '../entities/mini-profile.entity';
import { Profile } from '../entities/profile.entity';
import { GetProfileResponse, UrnCollection } from '../responses';
import { LinkedInPositionGroup, POSITION_GROUP_TYPE } from '../entities/linkedin-position-group.entity';
import { COLLECTION_RESPONSE_TYPE } from '../entities/linkedin-collection-response.entity';
import { LinkedInPosition } from '../entities/linkedin-position.entity';

const getProfilePictureUrls = (picture?: LinkedInVectorImage): string[] =>
  map(picture?.artifacts, artifact => `${picture?.rootUrl}${artifact.fileIdentifyingUrlPathSegment}`);

const transformMiniProfile = (miniProfile: LinkedInMiniProfile): MiniProfile => ({
  ...miniProfile,
  pictureUrls: getProfilePictureUrls(miniProfile.picture),
  profileId: (miniProfile.entityUrn || '').replace('urn:li:fs_miniProfile:', ''),
});

export const getProfilesFromResponse = <T extends { included: (LinkedInMiniProfile | { $type: string })[] }>(
  response: T,
): Record<ProfileId, MiniProfile> => {
  const miniProfiles = filter(response.included, p => p.$type === MINI_PROFILE_TYPE) as LinkedInMiniProfile[];

  const transformedMiniProfiles = miniProfiles.map((miniProfile: LinkedInMiniProfile) => transformMiniProfile(miniProfile));

  return keyBy(transformedMiniProfiles, 'profileId');
};

// SOURCE: https://stackoverflow.com/questions/43118692/typescript-filter-out-nulls-from-an-array
function notEmpty<TValue>(value: TValue | null | undefined): value is TValue {
  return value !== null && value !== undefined;
}

const getElementsFromCollectionResponse = (response: GetProfileResponse, collectionUrn: string ): string[] => { 

  const collection = (response.included ?? []).find(r => 'data' in r && r.data.$type === COLLECTION_RESPONSE_TYPE && r.data.entityUrn === collectionUrn) as UrnCollection;

  return collection.data.elements
 }

export const getPositionGroupsFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): LinkedInPositionGroup[] => {
  
  const results = response.included || [];

  const profile = results.find(r => '$type' in r && r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;

  const positionGroupsUrn = profile['*profilePositionGroups']

  const positionGroupsUrns = getElementsFromCollectionResponse(response, positionGroupsUrn)

  const positionGroups =  positionGroupsUrns.map(urn => {
    return results
        .find(r => '$type' in r && r.$type === POSITION_GROUP_TYPE && r.entityUrn === urn) as LinkedInPositionGroup;
  }).filter(notEmpty);

  return positionGroups
};





export const getProfileFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): Profile => {
  const results = response.included || [];

    const profile = results.find(r => '$type' in r && r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;
    
    const company = results.find(r => '$type' in r && r.$type === COMPANY_TYPE && profile.headline.includes(r.name)) as LinkedInCompany;
    const pictureUrls = getProfilePictureUrls(get(profile, 'profilePicture.displayImageReference.vectorImage', undefined));
    const positionGroups: LinkedInPositionGroup[] = getPositionGroupsFromResponse(publicIdentifier, response)
    const positions: LinkedInPosition[] = []

    return {
      ...profile,
      company,
      pictureUrls,
      positionGroups,
      positions
    };
};

export class ProfileRepository {
  private client: Client;

  constructor({ client }: { client: Client }) {
    this.client = client;
  }

  async getProfile({ publicIdentifier }: { publicIdentifier: string }): Promise<Profile> {
    const response = await this.client.request.profile.getProfile({ publicIdentifier });

    const profile = getProfileFromResponse(publicIdentifier, response)

    return profile
  }

  async getOwnProfile(): Promise<Profile | null> {
    const response = await this.client.request.profile.getOwnProfile();

    const miniProfile = response?.included?.find(r => r.$type === MINI_PROFILE_TYPE);

    if (!miniProfile) {
      return null;
    }

    return this.getProfile(miniProfile);
  }
}
