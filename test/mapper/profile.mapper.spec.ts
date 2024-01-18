import { createGetProfileResponse } from '../profile/profile-factories';
import { getProfileFromResponse } from '../../src/repositories/profile.repository';
import { ProfileMapper } from '../../src/mappers';
import { ProfileJSON } from '../../src/mappers/profile.json';

describe('getProfile', () => {
  it('should map core profile fields', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)
    const mapper = new ProfileMapper()

    const result: ProfileJSON = mapper.profileToJson(profile)

    expect(result.first_name).toEqual(resultProfile.firstName);
    expect(result.full_name).toEqual(resultProfile.firstName + " " + resultProfile.lastName);
    
  });


});