import { faker } from '@faker-js/faker';
import { orderBy, random, times } from 'lodash';

import { INVITATION_TYPE } from '../../src/entities/linkedin-invitation.entity';
import { createMiniProfile, createMiniProfileId } from '../profile/profile-factories';

const createInvitation = (count: number) =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.relationships.invitation.Invitation',
    '*fromMember': createMiniProfileId(),
    '*toMember': createMiniProfileId(),
    customMessage: faker.datatype.boolean(),
    entityUrn: faker.string.uuid(),
    invitationType: Object.values(INVITATION_TYPE)[random(0, 1)],
    invitee: {
      $type: 'com.linkedin.voyager.relationships.invitation.ProfileInvitee',
      '*miniProfile': createMiniProfileId(),
    },
    mailboxItemId: faker.string.uuid(),
    sentTime: faker.datatype.number(),
    sharedSecret: faker.lorem.word(),
    toMemberId: faker.string.uuid(),
    unseen: faker.datatype.boolean(),
  }));

export const createGetInvitationsResponse = (count: number) => {
  const resultInvitations = createInvitation(count);
  const resultProfiles = createMiniProfile(count * 2); // two profiles for each invitation
  const response = {
    data: {},
    included: [...resultInvitations, ...resultProfiles],
  };

  return { response, resultInvitations: orderBy(resultInvitations, 'sentTime', 'desc'), resultProfiles };
};
