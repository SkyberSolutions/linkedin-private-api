import { faker } from '@faker-js/faker';
import { random, times } from 'lodash';
import { GetProfileResponse, LinkedInCompany, LinkedInProfile, LinkedInVectorArtifact, LinkedInVectorImage } from 'src';

import { LinkedInMiniProfile } from '../../src/entities/linkedin-mini-profile.entity';
import { LinkedInPhotoFilterPicture, LinkedInPrimaryLocale, LinkedInProfileGeoLocation, LinkedInProfileLocation } from '../../src/entities/linkedin-profile.entity';
import { Country } from '../../src/types/country-code.enum';

export const createMiniProfileId = () => `urn:li:fs_miniProfile:${faker.string.uuid()}`;

const createVectorArtifact = (count: number): LinkedInVectorArtifact[] =>
  times(count, () => ({
    $type: 'com.linkedin.common.VectorArtifact',
    expiresAt: faker.date.anytime().getMilliseconds(),
    fileIdentifyingUrlPathSegment: faker.internet.url(),
    height: faker.number.int(),
    with: faker.number.int(),
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
    $anti_abuse_annotations: [{ attributeId: faker.number.int(), entityId: faker.number.int() }],
    $recipeTypes: [faker.lorem.word()],
    entityUrn: faker.string.uuid(),
    industry: { [faker.string.uuid()]: faker.lorem.word() },
    industryUrns: [faker.string.uuid()],
    logo: {
      vetorImage: createVectorImage(1)[0],
    },
    name: faker.person.firstName(),
    universalName: faker.person.firstName(),
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

const createLinkedInProfileGeoLocation = (): LinkedInProfileGeoLocation => {
  return {
    $type: 'com.linkedin.voyager.dash.identity.profile.ProfileGeoLocation',
  '*geo': faker.string.uuid(),
  $recipeTypes: [faker.string.uuid()],
  geoUrn: faker.string.uuid()
  }
}

const createLinkedInProfileLocation = (): LinkedInProfileLocation => {
  return {
    $type: 'com.linkedin.voyager.dash.identity.profile.ProfileLocation',
    countryCode: Country.UnitedStates
  }
}

const createLinkedInPrimaryLocale = (): LinkedInPrimaryLocale => {
  return {
    $type: 'com.linkedin.common.Locale',
  $anti_abuse_annotations: [{
    attributeId: faker.number.int(),
    entityId: faker.number.int(),
  }],
  country: Country.UnitedStates,
  language: "en_US"
  }
}

const createProfile = (count: number): LinkedInProfile[] =>
  times(count, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const headline = faker.lorem.word();
    return {
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
    $recipeTypes: times(3, faker.string.uuid),
    defaultToActivityTab: faker.datatype.boolean(),
    educationOnProfileTopCardShown: faker.datatype.boolean(),
    entityUrn: createMiniProfileId(),
    firstName: firstName,
    lastName: lastName,
    geoLocation: createLinkedInProfileGeoLocation(),
    geoLocationBackfilled: faker.datatype.boolean(),
    headline: headline,
    industryUrn: faker.string.uuid(),
    location: createLinkedInProfileLocation(),
    locationName: faker.lorem.word(),
    multiLocaleFirstName: {"en_US": firstName},
    multiLocaleHeadline: {"en_US": headline},
    multiLocaleLastName: {"en_US": lastName},
    objectUrn: faker.string.uuid(),
    primaryLocale: createLinkedInPrimaryLocale(),
    profilePicture: createProfilePicture(1)[0],
    publicIdentifier: faker.string.uuid(),
    supportedLocales: [],
    trackingId: faker.string.uuid(),
    versionTag: faker.string.uuid(),
  };
  
});

export const createMiniProfile = (count: number): LinkedInMiniProfile[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.identity.shared.MiniProfile',
    trackingId: faker.string.uuid(),
    firstName: faker.lorem.words(),
    lastName: faker.lorem.words(),
    publicIdentifier: faker.string.uuid(),
    objectUrn: faker.string.uuid(),
    entityUrn: createMiniProfileId(),
    occupation: faker.lorem.words(),
    picture: createVectorImage(1)[0],
    backgroundImage: createVectorImage(1)[0],
  }));

export const createGetProfileResponse = () => {
  const profiles = createProfile(10);
  const companies = createCompany(10);

  const resultProfile = profiles[random(0, 9)];
  const resultCompany = companies[random(0, 9)];

  resultProfile.headline = `${faker.random.word} at ${resultCompany.name}`;

  const response: GetProfileResponse = {
    data: {
      elements: times(3, faker.string.uuid),
      $type: "com.linkedin.restli.common.CollectionResponse",
      entityUrn: faker.string.uuid(),
      paging: {
        count: 10,
        links: [],
        start: 0
      },
      metadata: undefined
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
      plainId: faker.number.int(),
      premiumSubscriber: faker.datatype.boolean(),
      publicContactInfo: {
        $type: 'com.linkedin.voyager.identity.shared.PublicContactInfo',
      },
    },
    included: [resultProfile],
  };

  return { response, resultProfile };
};
