import { difference } from 'lodash';
import { reset, verify, when } from 'testdouble';
import { URL } from 'url';

import { linkedinApiUrl } from '../../config';
import { defaultMocks } from '../utils/defaultMocks';
import { createGetOwnProfileResponse, createGetProfileResponse } from './profile-factories';

const getProfileRequestUrl = new URL('identity/dash/profiles', linkedinApiUrl).toString();

const username = 'username';
const password = 'password';
let axios: any;
let Client: any;

beforeEach(async () => {
  ({ axios, Client } = await defaultMocks());
});

afterEach(() => {
  reset();
});

describe('getProfile', () => {
  it('should return the correct profile from the response', async () => {
    const { response, resultProfile } = createGetProfileResponse();
    const reqParams = {
      q: 'memberIdentity',
      memberIdentity: resultProfile.publicIdentifier,
      decorationId: 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
    };

    when(axios.get(getProfileRequestUrl, { params: reqParams })).thenResolve({ data: response });

    const client = new Client();
    await client.login.userPass({ username, password });
    const profile = await client.profile.getProfile({ publicIdentifier: resultProfile.publicIdentifier });

    expect(profile.publicIdentifier).toEqual(resultProfile.publicIdentifier);
    expect(difference(Object.keys(resultProfile), Object.keys(profile)).length).toEqual(0);
  });
});

describe('getOwnProfile', () => {
  const requestUrl = new URL('me', linkedinApiUrl).toString();

  it('should return the correct profile from the response', async () => {
    const { response: miniProfileResponse, resultProfile: resultMiniProfile } = createGetOwnProfileResponse();
    const { response: profileResponse, resultProfile } = createGetProfileResponse();
    const reqParams = {
      q: 'memberIdentity',
      memberIdentity: resultMiniProfile.publicIdentifier,
      decorationId: 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
    };

    resultProfile.publicIdentifier = resultMiniProfile.publicIdentifier;

    when(axios.get(requestUrl, undefined)).thenResolve({ data: miniProfileResponse });
    when(axios.get(getProfileRequestUrl, { params: reqParams })).thenResolve({ data: profileResponse });

    const client = new Client();
    await client.login.userPass({ username, password });
    const profile = await client.profile.getOwnProfile();

    expect(profile.publicIdentifier).toEqual(resultProfile.publicIdentifier);
    expect(difference(Object.keys(resultProfile), Object.keys(profile)).length).toEqual(0);
  });

  it('should return null and not request full profile if undefined response was returned', async () => {
    when(axios.get(requestUrl, undefined)).thenResolve({ data: undefined });

    const client = new Client();
    await client.login.userPass({ username, password });
    const profile = await client.profile.getOwnProfile();

    expect(profile).toBe(null);
    verify(axios.get(getProfileRequestUrl), { ignoreExtraArgs: true, times: 0 });
  });


  it('should map core profile fields', async () => {
    const { response: miniProfileResponse, resultProfile: resultMiniProfile } = createGetOwnProfileResponse();
    const { response: profileResponse, resultProfile } = createGetProfileResponse();
    const reqParams = {
      q: 'memberIdentity',
      memberIdentity: resultMiniProfile.publicIdentifier,
      decorationId: 'com.linkedin.voyager.dash.deco.identity.profile.FullProfileWithEntities-35',
    };

    resultProfile.publicIdentifier = resultMiniProfile.publicIdentifier;

    when(axios.get(requestUrl, undefined)).thenResolve({ data: miniProfileResponse });
    when(axios.get(getProfileRequestUrl, { params: reqParams })).thenResolve({ data: profileResponse });

    const client = new Client();
    await client.login.userPass({ username, password });
    const profile = await client.profile.getOwnProfile();
    const result = client.mappers.profile.profileToJson(profile)

    expect(result.first_name).toEqual(resultProfile.firstName);
    expect(result.full_name).toEqual(resultProfile.firstName + " " + resultProfile.lastName);
  });
});
