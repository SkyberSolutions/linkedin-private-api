import { faker } from '@faker-js/faker';
import { random, times } from 'lodash';
import { LinkedInCompany, LinkedInProfile, LinkedInVectorArtifact, LinkedInVectorImage } from 'src';

import { LinkedInMiniProfile } from '../../src/entities/linkedin-mini-profile.entity';
import { LinkedInPhotoFilterPicture } from '../../src/entities/linkedin-profile.entity';

export const createMiniProfileId = () => `urn:li:fs_miniProfile:${faker.string.uuid()}`;

const createVectorArtifact = (count: number): LinkedInVectorArtifact[] =>
  times(count, () => ({
    $type: 'com.linkedin.common.VectorArtifact',
    expiresAt: faker.datatype.number(),
    fileIdentifyingUrlPathSegment: faker.internet.url(),
    height: faker.datatype.number(),
    with: faker.datatype.number(),
  }));

const createVectorImage = (count: number): LinkedInVectorImage[] =>
  times(count, () => ({
    $type: 'com.linkedin.common.VectorImage',
    artifacts: createVectorArtifact(4),
    rootUrl: faker.internet.url(),
  }));

const createCompany = (count: number): LinkedInCompany[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.dash.organization.Company',
    $anti_abuse_annotations: [{ attributeId: faker.datatype.number(), entityId: faker.datatype.number() }],
    $recipeTypes: [faker.random.word()],
    entityUrn: faker.string.uuid(),
    industry: { [faker.string.uuid()]: faker.random.word() },
    industryUrns: [faker.string.uuid()],
    logo: {
      vetorImage: createVectorImage(1)[0],
    },
    name: faker.name.firstName(),
    universalName: faker.name.firstName(),
    url: faker.internet.url(),
  }));

const createProfilePicture = (count: number): LinkedInPhotoFilterPicture[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.dash.identity.profile.PhotoFilterPicture',
    $recipeTypes: [faker.string.uuid()],
    displayImageReference: {
      vectorImage: createVectorImage(1)[0],
    },
    displayImageUrn: faker.string.uuid(),
    photoFilterEditInfo: {},
  }));

const createProfile = (count: number): Partial<LinkedInProfile>[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.dash.identity.profile.Profile',
    '*industry': faker.string.uuid(),
    '*profileCertifications': faker.string.uuid(),
    '*profileCourses': faker.string.uuid(),
    '*profileEducations': faker.string.uuid(),
    '*profileHonors': faker.string.uuid(),
    '*profileLanguages': faker.string.uuid(),
    '*profileOrganizations': faker.string.uuid(),
    '*profilePatents': faker.string.uuid(),
    '*profilePositionGroups': faker.string.uuid(),
    '*profileProjects': faker.string.uuid(),
    '*profilePublications': faker.string.uuid(),
    '*profileSkills': faker.string.uuid(),
    '*profileTestScores': faker.string.uuid(),
    '*profileTreasuryMediaProfile': faker.string.uuid(),
    '*profileVolunteerExperiences': faker.string.uuid(),
    $recipeTypes: times(3, faker.datatype.uuid),
    defaultToActivityTab: faker.datatype.boolean(),
    educationOnProfileTopCardShown: faker.datatype.boolean(),
    entityUrn: createMiniProfileId(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    geoLocationBackfilled: faker.datatype.boolean(),
    headline: faker.random.word(),
    industryUrn: faker.string.uuid(),
    locationName: faker.random.word(),
    objectUrn: faker.string.uuid(),
    profilePicture: createProfilePicture(1)[0],
    publicIdentifier: faker.string.uuid(),
    trackingId: faker.string.uuid(),
    versionTag: faker.string.uuid(),
  }));

export const createMiniProfile = (count: number): LinkedInMiniProfile[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.identity.shared.MiniProfile',
    trackingId: faker.string.uuid(),
    firstName: faker.random.words(),
    lastName: faker.random.words(),
    publicIdentifier: faker.string.uuid(),
    objectUrn: faker.string.uuid(),
    entityUrn: createMiniProfileId(),
    occupation: faker.random.words(),
    picture: createVectorImage(1)[0],
    backgroundImage: createVectorImage(1)[0],
  }));

export const createGetProfileResponse = () => {
  const profiles = createProfile(10);
  const companies = createCompany(10);

  const resultProfile = profiles[random(0, 9)];
  const resultCompany = companies[random(0, 9)];

  resultProfile.headline = `${faker.random.word} at ${resultCompany.name}`;

  const response = {
    data: {
      data: {},
    },
    included: [...profiles, ...companies],
  };

  return { response, resultProfile, resultCompany };
};

export const createGetOwnProfileResponse = () => {
  const resultProfile = createMiniProfile(1)[0];

  const response = {
    data: {
      $type: 'com.linkedin.voyager.common.Me',
      '*miniProfile': resultProfile.entityUrn,
      plainId: faker.datatype.number(),
      premiumSubscriber: faker.datatype.boolean(),
      publicContactInfo: {
        $type: 'com.linkedin.voyager.identity.shared.PublicContactInfo',
      },
    },
    included: [resultProfile],
  };

  return { response, resultProfile };
};
