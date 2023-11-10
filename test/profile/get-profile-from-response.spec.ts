import { difference } from 'lodash';
import { createGetProfileResponse } from './profile-factories';
import { getProfileFromResponse } from '../../src/repositories/profile.repository';
import { LinkedInPositionGroup } from '../../src/entities/linkedin-position-group.entity';
import { LinkedInPosition } from '../../src/entities/linkedin-position.entity';
import { LinkedInSkill } from '../../src/entities/linkedin-skill.entity';
import { LinkedInEducation } from '../../src/entities/linkedin-education.entity';
import { LinkedInCompany } from 'src/entities/linkedin-company.entity';

describe('getProfile', () => {
  it('should return the correct profile from the response', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.publicIdentifier).toEqual(resultProfile.publicIdentifier);
    expect(difference(Object.keys(resultProfile), Object.keys(profile)).length).toEqual(0);
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
    profile.positionGroups.forEach((group: LinkedInPositionGroup) => expect(typeof group['*profilePositionInPositionGroup']).toEqual('string'));
  });

  it('should populate positions on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.positions).toHaveLength(9);
    profile.positions.forEach((position: LinkedInPosition) => expect(typeof position['*employmentType']).toEqual('string'));
  });


  it('should populate skills on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.skills).toHaveLength(10);
    profile.skills.forEach((skill: LinkedInSkill) => expect(typeof skill.name).toEqual('string'));
  });

  it('should populate education on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    expect(profile.educations).toHaveLength(2);
    profile.educations.forEach((education: LinkedInEducation) => expect(typeof education.schoolName).toEqual('string'));
  });

  it('should populate companies on the result profile', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const profile = getProfileFromResponse(resultProfile.publicIdentifier, response)

    //Sum of position groups + educations
    expect(profile.companies).toHaveLength(5);
    profile.companies.forEach((company: LinkedInCompany) => expect(typeof company.name).toEqual('string'));
  });
});