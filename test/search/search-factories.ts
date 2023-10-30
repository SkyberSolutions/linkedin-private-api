import { faker } from '@faker-js/faker';
import { times } from 'lodash';

import { createMiniProfile } from '../profile/profile-factories';

const createSearchHit = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.search.SearchHitV2',
    publicIdentifier: faker.string.uuid(),
    targetUrn: faker.string.uuid(),
    trackingId: faker.string.uuid(),
    trackingUrn: faker.string.uuid(),
  }));

const createSearchCluster = (count: number, searchHitCount: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.search.BlendedSearchCluster',
    elements: createSearchHit(searchHitCount),
    type: 'SEARCH_HITS',
  }));

const createMiniCompany = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.entities.shared.MiniCompany',
    active: faker.datatype.boolean(),
    entityUrn: `urn:li:fs_miniCompany:${faker.string.uuid()}`,
    name: faker.string.uuid(),
    objectUrn: faker.string.uuid(),
    showcase: faker.datatype.boolean(),
    trackingId: faker.string.uuid(),
    universalName: faker.lorem.word(),
  }));

const createBaseCompany = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.organization.Company',
    entityUrn: faker.string.uuid(),
    logo: {
      $type: 'com.linkedin.voyager.organization.CompanyLogoImage',
      image: {},
      type: 'SQUARE_LOGO',
    },
    name: faker.string.uuid(),
  }));

const createJobPosting = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.jobs.JobPosting',
    entityUrn: faker.string.uuid(),
    dashEntityUrn: faker.string.uuid(),
    formattedLocation: faker.string.sample(),
    listedAt: faker.number.int(),
    title: faker.string.sample(),
    workRemoteAllowed: faker.datatype.boolean(),
    companyDetails: {
      '*companyResolutionResult': faker.string.sample(),
      $type: 'com.linkedin.voyager.jobs.JobPostingCompany',
      company: faker.string.sample(),
    },
  }));

const createJobSearchHit = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.search.SearchHit',
    hitInfo: {
      '*jobPostingResolutionResult': faker.string.sample(),
      $type: 'com.linkedin.voyager.search.SearchJobJserp',
      jobPosting: faker.string.sample(),
      sponsored: faker.datatype.boolean(),
    },
    targetPageInstance: faker.string.sample(),
    trackingId: faker.string.sample(),
  }));

export const creatSearchPeopleResponse = (count: number) => ({
  data: {
    elements: createSearchCluster(count, 1),
  },
  included: createMiniProfile(count),
});

export const createSearchCompaniesResponse = (count: number) => ({
  data: {
    elements: createSearchCluster(count, 1),
  },
  included: createMiniCompany(count),
});

export const createSearchJobsResponse = (count: number) => {
  const companies = createBaseCompany(count);
  const jobPostings = createJobPosting(count).map((jp, index) => ({
    ...jp,
    companyDetails: {
      ...jp.companyDetails,
      company: companies[index].entityUrn,
    },
  }));
  const searchHits = createJobSearchHit(count).map((sh, index) => ({
    ...sh,
    hitInfo: {
      ...sh.hitInfo,
      jobPosting: jobPostings[index].entityUrn,
    },
  }));

  return {
    data: {
      elements: searchHits,
    },
    included: [...jobPostings, ...companies],
  };
};
