import { difference } from 'lodash';
import { createGetProfileResponse } from './profile-factories';
import { getProfileFromResponse } from '../../src/repositories/profile.repository';
import { LinkedInPositionGroup } from 'src/entities/linkedin-position-group.entity';

describe('getProfile', () => {
  it('should return the correct profile from the response', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.publicIdentifier).toEqual(resultProfile.publicIdentifier);
    expect(difference(Object.keys(resultProfile), Object.keys(profile)).length).toEqual(0);
  });

  it('should populate company on the result profile', async () => {
    const { response, resultProfile, resultCompany } = createGetProfileResponse();
    
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.company).toEqual(resultCompany);
  });

  it('should populate profile picture urls on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.pictureUrls).toHaveLength(4);
    profile.pictureUrls.forEach((url: string) => expect(typeof url).toEqual('string'));
  });


  it('should populate positionGroups on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.positionGroups).toHaveLength(3);
    profile.positionGroups.forEach((group: LinkedInPositionGroup) => expect(typeof group['*company']).toEqual('string'));
  });
});