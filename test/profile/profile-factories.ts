import { faker } from '@faker-js/faker';
import { random, times } from 'lodash';
import { GetProfileResponse, LinkedInCompany, LinkedInProfile, LinkedInVectorArtifact, LinkedInVectorImage, UrnCollection } from 'src';

import { LinkedInMiniProfile, MINI_PROFILE_TYPE } from '../../src/entities/linkedin-mini-profile.entity';
import { LinkedInPhotoFilterPicture, LinkedInPrimaryLocale, LinkedInProfileGeoLocation, LinkedInProfileLocation, PROFILE_TYPE } from '../../src/entities/linkedin-profile.entity';
import { Country } from '../../src/types/country-code.enum';
import { LinkedInPositionGroup, POSITION_GROUP_TYPE } from '../../src/entities/linkedin-position-group.entity';
import { LinkedInDateRange } from '../../src/entities/linkedin-date-range.entity';
import { LinkedInPosition, POSITION_TYPE } from '../../src/entities/linkedin-position.entity';
import { LinkedInSkill } from '../../src/entities/linkedin-skill.entity';
import { EDUCATION_TYPE, LinkedInEducation } from '../../src/entities/linkedin-education.entity';
import { LinkedInIntegerRange } from '../../src/entities/linkedin-integer-range.entity';

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

const createLinkedDateRange = (): LinkedInDateRange => {
  const startDate = faker.date.anytime()
  const endDate = faker.date.anytime()
  return {
    $type: 'com.linkedin.common.DateRange',
    $recipeTypes: [], 
    start: {
      month: startDate.getMonth(),
      year: startDate.getFullYear(),
      $recipeTypes: [],
      $type: 'com.linkedin.common.Date'
    },
    end:{
      month: endDate.getMonth(),
      year: endDate.getFullYear(),
      $recipeTypes: [],
      $type: 'com.linkedin.common.Date'
    }
  }
}

const createLinkedIntegerRange = (): LinkedInIntegerRange => {
  const startNumber = faker.number.int()
  const endNumber = faker.number.int({min: startNumber + 1})
  return {
    start: startNumber,
    end: endNumber,
    $recipeTypes: [],
    $type: 'com.linkedin.voyager.dash.deco.common.IntegerRange'
  }
}

const createCollectionResponse = (urn: string, count: number):UrnCollection => {
 
  return {
    data: {
      elements: times(count, faker.string.uuid),
      $type: 'com.linkedin.restli.common.CollectionResponse',
      entityUrn: urn,
      paging: {
        count: count,
        links: [],
        start: 0
      },
      metadata: undefined
    },
    included: []
  }

};

const createPositionGroup = (urn: string, companyUrn: string, companyName: string): LinkedInPositionGroup => {
  return  {
    $type: POSITION_GROUP_TYPE,
    '*profilePositionInPositionGroup': faker.string.uuid(),
    dateRange: createLinkedDateRange(),
    multiLocaleCompanyName: { 'en_US': companyName },
    companyName: companyName,
    '*company': companyUrn,
    companyUrn: companyUrn,
    $recipeTypes: [],
    entityUrn: urn,
  };
};

const createPosition = (urn: string, companyUrn: string, companyName: string): LinkedInPosition => {
  const locationName = faker.lorem.words();
  const title = faker.lorem.words();
  return  {
    $type: POSITION_TYPE,
    dateRange: createLinkedDateRange(),
    multiLocaleCompanyName: { 'en_US': companyName },
    companyName: companyName,
    '*company': companyUrn,
    title: title,
    companyUrn: companyUrn,
    '*employmentType': faker.lorem.word(),
    employmentTypeUrn: faker.string.uuid(),
    entityUrn: urn,
    multiLocaleGeoLocationName: { 'en_US': locationName },
    shouldShowSourceOfHireBadge: false,
    locationName: locationName,
    '*profileTreasuryMediaPosition': faker.string.uuid(),
    multiLocaleTitle: { 'en_US': title },
    $recipeTypes: [],
    geoLocationName: locationName,
    multiLocaleLocationName: { 'en_US': locationName },
    sourceOfHireType: faker.lorem.word()
  };
};

const createSkill = (urn: string): LinkedInSkill => {
  const name = faker.lorem.words();
  return  {
    $type: 'com.linkedin.voyager.dash.identity.profile.Skill',
    $recipeTypes: [],
    entityUrn: urn,
    name: name,
    multiLocaleName: {'en_US': name}
  };
};

const createEducation = (urn: string): LinkedInEducation => {
  const companyUrn = faker.string.uuid();
  const schoolUrn = faker.string.uuid();
  const schoolName = faker.lorem.words();
  const fieldOfStudy = faker.lorem.words();
  const degreeName = faker.lorem.word();
  return  {
    dateRange: createLinkedDateRange(),
    description: null,
    "*company": companyUrn,
    "*profileTreasuryMediaEducation": faker.string.uuid(),
    companyUrn: companyUrn,
    schoolUrn: schoolUrn,
    entityUrn: urn,
    standardizedFieldOfStudyUrn: null,
    schoolName: schoolName,
    fieldOfStudy: fieldOfStudy,
    degreeName: degreeName,
    multiLocaleGrade: null,
    $recipeTypes: [],
    multiLocaleSchoolName: {'en_US': schoolName},
    $type: EDUCATION_TYPE,
    multiLocaleActivities: null,
    activities: null,
    grade: null,
    "*school": schoolUrn,
    multiLocaleFieldOfStudy: {'en_US': fieldOfStudy},
    multiLocaleDescription: null,
    multiLocaleDegreeName: {'en_US': degreeName},
    degreeUrn: null
  };
};

const createCompany = (urn: string): LinkedInCompany => {
  const name = faker.lorem.words();
  return {
    $type: 'com.linkedin.voyager.dash.organization.Company',
    $anti_abuse_annotations: [{ attributeId: faker.number.int(), entityId: faker.number.int() }],
    $recipeTypes: [faker.lorem.word()],
    entityUrn: urn,
    employeeCountRange: createLinkedIntegerRange(),
    industry: { [faker.string.uuid()]: faker.lorem.word() },
    industryUrns: [faker.string.uuid()],
    logo: {
      vetorImage: createVectorImage(1)[0],
    },
    name: name,
    universalName: name,
    url: faker.internet.url(),
  }};

const createProfile = (count: number): LinkedInProfile[] =>
  times(count, () => {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const headline = faker.lorem.word();
    return {
    $type: PROFILE_TYPE,
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
    $type: MINI_PROFILE_TYPE,
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
  const positionGroupCollection: UrnCollection[] = []
  const positionGroups: LinkedInPositionGroup[] = []

  const positionCollections: UrnCollection[] = []
  const positions: LinkedInPosition[] = []

  const skillCollections: UrnCollection[] = []
  const skills: LinkedInSkill[] = []

  const educationCollections: UrnCollection[] = []
  const educations: LinkedInEducation[] = []

  const profiles = createProfile(10);

  profiles.forEach(profile => {
    const collectionUrn = faker.string.uuid()
    const collection = createCollectionResponse(collectionUrn, 3)
    positionGroupCollection.push(collection)
    profile['*profilePositionGroups'] = collection.data.entityUrn
  });

  positionGroupCollection.forEach(positionGroup => {
    const companyUrn = faker.string.uuid();
    const companyName = faker.lorem.words();

    positionGroup.data.elements.forEach(urn => {
        positionGroups.push(
          createPositionGroup(urn, companyUrn, companyName)
        )
    });
  })

  positionGroups.forEach(positionGroup => {
    const collectionUrn = positionGroup['*profilePositionInPositionGroup']
    const collection = createCollectionResponse(collectionUrn, 3)
    positionCollections.push(collection)

    collection.data.elements.forEach(urn =>{

      positions.push(
        createPosition(urn, positionGroup.companyUrn, positionGroup.companyName)
      )
    })
  });

  // SKILLS
  profiles.forEach(profile => {
    const collectionUrn = faker.string.uuid()
    const collection = createCollectionResponse(collectionUrn, 10)
    skillCollections.push(collection)
    profile['*profileSkills'] = collection.data.entityUrn
  });

  skillCollections.forEach(skillCollection => {
  
    skillCollection.data.elements.forEach(urn => {
        skills.push(
          createSkill(urn)
        )
    });
  })

  // EDUCATIONS
  profiles.forEach(profile => {
    const collectionUrn = faker.string.uuid()
    const collection = createCollectionResponse(collectionUrn, 2)
    educationCollections.push(collection)
    profile['*profileEducations'] = collection.data.entityUrn
  });

  educationCollections.forEach(educationCollection => {
  
    educationCollection.data.elements.forEach(urn => {
        educations.push(
          createEducation(urn)
        )
    });
  })

  const companyUrns = [
    ...positionGroups.map(positionGroup => positionGroup.companyUrn),
    ...educations.map(education => education.companyUrn)
  ]

  const companies: LinkedInCompany[] = companyUrns.map (urn => {
    return createCompany(urn)
  })
  
  const resultProfile = profiles[random(0, 9)];

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
    included: [
      ...profiles, 
      ...companies, 
      ...positionGroupCollection, 
      ...positionGroups, 
      ...positionCollections, 
      ...positions,
      ...skillCollections, 
      ...skills,
      ...educationCollections,
      ...educations,
      ...companies
    ],
  };

  return { response, resultProfile };
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


