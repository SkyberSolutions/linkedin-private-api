import { faker } from '@faker-js/faker';
import { orderBy, times } from 'lodash';

import { LinkedEventCreateResponse } from '../../src/entities/linkedin-event-create-response';
import { LinkedInMessageEvent } from '../../src/entities/linkedin-message-event.entity';
import { LinkedInMessage } from '../../src/entities/linkedin-message.entity';
import { createMiniProfile } from '../profile/profile-factories';

const createMessage = (count: number): LinkedInMessage[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.messaging.event.MessageEvent',
    attributedBody: {
      $type: 'com.linkedin.pemberly.text.AttributedText',
      text: faker.lorem.sentence(),
    },
    body: faker.lorem.word(),
    messageBodyRenderFormat: faker.lorem.word(),
  }));

const createMessageEvent = (count: number): Partial<LinkedInMessageEvent>[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.messaging.Event',
    '*from': faker.string.uuid(),
    backendUrn: faker.string.uuid(),
    createdAt: faker.number.int(),
    dashEntityUrn: faker.string.uuid(),
    entityUrn: faker.string.uuid(),
    originToken: faker.string.uuid(),
    subtype: faker.string.uuid(),
    previousEventInConversation: faker.string.uuid(),
    eventContent: createMessage(1)[0],
  }));

const createEventCreate = (count: number): LinkedEventCreateResponse[] =>
  times(count, () => ({
    $type: 'com.linkedin.voyager.messaging.create.EventCreateResponse',
    backendConversationUrn: faker.string.uuid(),
    backendEventUrn: faker.string.uuid(),
    conversationUrn: faker.string.uuid(),
    createdAt: faker.number.int(),
    eventUrn: faker.string.uuid(),
  }));

export const createSendMessageResponse = () => {
  const resultCreationEvent = createEventCreate(1)[0];
  const response = {
    data: {
      $type: 'com.linkedin.restli.common.ActionResponse',
      value: resultCreationEvent,
    },
    included: [],
  };

  return { response, resultCreationEvent };
};

export const createGetMessagesResponse = (count: number) => {
  const resultMessages = createMessageEvent(count);
  const resultProfiles = createMiniProfile(count * 2); // two participants for each conversation
  const response = {
    data: {},
    included: [...resultMessages, ...resultProfiles],
  };

  return { response, resultMessages: orderBy(resultMessages, 'createdAt', 'desc'), resultProfiles };
};
