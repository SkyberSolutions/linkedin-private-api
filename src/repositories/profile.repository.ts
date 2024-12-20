import { filter, get, keyBy, map } from 'lodash';

import { Client } from '../core/client';
import { LinkedInMiniProfile, MINI_PROFILE_TYPE } from '../entities/linkedin-mini-profile.entity';
import { LinkedInProfile, PROFILE_TYPE } from '../entities/linkedin-profile.entity';
import { LinkedInVectorImage } from '../entities/linkedin-vector-image.entity';
import { MiniProfile, ProfileId } from '../entities/mini-profile.entity';
import { Profile } from '../entities/profile.entity';
import { GetProfileResponse, UrnCollection } from '../responses';
import { LinkedInPositionGroup, POSITION_GROUP_TYPE } from '../entities/linkedin-position-group.entity';
import { COLLECTION_RESPONSE_TYPE } from '../entities/linkedin-collection.entity';
import { LinkedInPosition, POSITION_TYPE } from '../entities/linkedin-position.entity';
import { LinkedInSkill, SKILL_TYPE } from '../entities/linkedin-skill.entity';
import { EDUCATION_TYPE, LinkedInEducation } from '../entities/linkedin-education.entity';
import { LinkedInCompany, COMPANY_TYPE } from '../entities/linkedin-company.entity';
import { Image } from '../entities/image.entity';
import { ProfileMapper } from '../mappers';
import { ProfileJSON } from '../mappers/profile.json';

const getProfilePictureUrls = (picture?: LinkedInVectorImage): Image[] =>
  map(picture?.artifacts, artifact => {
    return {
      width: artifact.with,
      height: artifact.height,
      url: `${picture?.rootUrl}${artifact.fileIdentifyingUrlPathSegment}`
    }
    
  });

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
  const collection = (response.included ?? []).find(r => r.$type === COLLECTION_RESPONSE_TYPE && r.entityUrn === collectionUrn) as UrnCollection;

  return collection['*elements'] ?? collection.elements
 }

 const getLinkedInProfileFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): LinkedInProfile => {
  const results = response.included || [];

  return results.find(r => '$type' in r && r.$type === PROFILE_TYPE && r.publicIdentifier === publicIdentifier) as LinkedInProfile;
};

const getPositionGroupsFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): LinkedInPositionGroup[] => {
  const profile = getLinkedInProfileFromResponse(publicIdentifier, response)

  const positionGroupsUrn = profile['*profilePositionGroups']

  const positionGroupsUrns = getElementsFromCollectionResponse(response, positionGroupsUrn)
  const results = response.included || [];
  const positionGroups =  positionGroupsUrns.map(urn => {
    return results
        .find(r => '$type' in r && r.$type === POSITION_GROUP_TYPE && r.entityUrn === urn) as LinkedInPositionGroup;
  }).filter(notEmpty);
  
  return positionGroups
};

const getPositionsFromResponse = ( publicIdentifier: string, response: GetProfileResponse, positionCollectionUrns: string[] ): LinkedInPosition[] => {
  const positions: LinkedInPosition[] = []

  const results = response.included || [];
  positionCollectionUrns.forEach(groupUrn => {
    const positionUrns = getElementsFromCollectionResponse(response, groupUrn)

    positionUrns.forEach(positionUrn => {
      const position = results
      .find(r => '$type' in r && r.$type === POSITION_TYPE && r.entityUrn === positionUrn) as LinkedInPosition;
      positions.push(position)
    })
  });
  
  return positions.filter(notEmpty);
};

const getSkillsFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): LinkedInSkill[] => {
  
  const results = response.included || [];

  const profile = getLinkedInProfileFromResponse(publicIdentifier, response)

  const collectionUrn = profile['*profileSkills']

  const skillUrns = getElementsFromCollectionResponse(response, collectionUrn)

  const skills =  skillUrns.map(urn => {
    return results
        .find(r => '$type' in r && r.$type === SKILL_TYPE && r.entityUrn === urn) as LinkedInSkill;
  }).filter(notEmpty);

  return skills
};

const getEducationsFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): LinkedInEducation[] => {
  
  const results = response.included || [];

  const profile = getLinkedInProfileFromResponse(publicIdentifier, response)

  const collectionUrn = profile['*profileEducations']

  const elementUrns = getElementsFromCollectionResponse(response, collectionUrn)

  const educations =  elementUrns.map(urn => {
    return results
        .find(r => '$type' in r && r.$type === EDUCATION_TYPE && r.entityUrn === urn) as LinkedInEducation;
  }).filter(notEmpty);

  return educations
};

const getCompaniesFromResponse = ( companyUrns: string[], response: GetProfileResponse ): LinkedInCompany[] => {
  const results = response.included || [];

  const companies =  companyUrns.map(urn => {
    return results
        .find(r => '$type' in r && r.$type === COMPANY_TYPE && r.entityUrn === urn) as LinkedInCompany;
  }).filter(notEmpty);

  return companies
};

export const getProfileFromResponse = ( publicIdentifier: string, response: GetProfileResponse ): Profile => {
  const profile = getLinkedInProfileFromResponse(publicIdentifier, response)
    
    const pictureUrls = getProfilePictureUrls(get(profile, 'profilePicture.displayImageReference.vectorImage', undefined));

    const positionGroups: LinkedInPositionGroup[] = getPositionGroupsFromResponse(publicIdentifier, response)
    
    const positions: LinkedInPosition[] = getPositionsFromResponse(publicIdentifier, response, positionGroups.map((group) => group['*profilePositionInPositionGroup']))

    const skills: LinkedInSkill[] = getSkillsFromResponse(publicIdentifier, response)

    const educations: LinkedInEducation[] = getEducationsFromResponse(publicIdentifier, response)

    const companyUrns = [
      ...positionGroups.map(positionGroup => positionGroup.companyUrn),
      ...educations.map(education => education.companyUrn)
    ]

    const companies: LinkedInCompany[] = getCompaniesFromResponse(companyUrns, response)

    return {
      ...profile,
      pictureUrls,
      positionGroups,
      positions,
      skills,
      educations,
      companies
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

  profileToJson(input: Profile): ProfileJSON {
    const mapper = new ProfileMapper()
    return mapper.profileToJson(input)
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
