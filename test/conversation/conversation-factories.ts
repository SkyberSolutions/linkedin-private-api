import { faker } from '@faker-js/faker';
import { orderBy, times } from 'lodash';
import { LinkedinConversation } from 'src';

import { FeaturedType, LinkedInParticipantReceipts } from '../../src/entities/linkedin-conversation.entity';
import { createMiniProfile } from '../profile/profile-factories';

const createReceipt = (count: number): LinkedInParticipantReceipts[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.messaging.ParticipantReceipts',
    fromEntity: faker.string.uuid(),
    fromParticipant: faker.string.uuid(),
    seenReceipt: {
      $type: 'com.linkedin.voyager.messaging.SeenReceipt',
      eventUrn: faker.string.uuid(),
      seenAt: faker.datatype.number(),
    },
  }));

const createConversation = (count: number): Partial<LinkedinConversation>[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.messaging.Conversation',
    '*events': [faker.string.uuid()],
    '*participants': [faker.string.uuid(), faker.string.uuid()],
    '*type': [faker.string.uuid()],
    archived: faker.datatype.boolean(),
    backendUrn: faker.string.uuid(),
    blocked: faker.datatype.boolean(),
    entityUrn: `urn:li:fs_conversation:${faker.string.uuid()}`,
    featureTypes: Object.values(FeaturedType.CREATE_NEW_GROUP_CHAT),
    firstMessageUrn: faker.string.uuid(),
    lastActivityAt: faker.datatype.number(),
    muted: faker.datatype.boolean(),
    notificationStatus: faker.lorem.word(),
    read: faker.datatype.boolean(),
    receipts: createReceipt(2),
    totalEventCount: faker.number.int(),
    unreadCount: faker.number.int(),
    viewerCurrentParticipant: faker.datatype.boolean(),
    withNonConnection: faker.datatype.boolean(),
  }));

export const createGetConversationsResponse = (count: number) => {
  const resultConversations = createConversation(count);
  const resultProfiles = createMiniProfile(count * 2); // two participants for each conversation
  const response = {
    data: {},
    included: [...resultConversations, ...resultProfiles],
  };

  return { response, resultConversations: orderBy(resultConversations, 'lastActivityAt', 'desc'), resultProfiles };
};

export const createGetConversationResponse = () => {
  const resultConversation = createConversation(1)[0];
  const resultProfiles = createMiniProfile(2); // two participants for each conversation
  const response = {
    data: resultConversation,
    included: resultProfiles,
  };

  return { response, resultConversation, resultProfiles };
};

