import { graphqlRequest } from '../db/connection';
import { chatFactory } from '../db/factories';

import './setup.ts';

describe('channelQueries', () => {
  test('chats', async () => {
    await chatFactory({});
    await chatFactory({});
    await chatFactory({});

    const qry = `
      query chats {
        chats {
          _id
        }
      }
    `;

    const response = await graphqlRequest(qry, 'chats');

    expect(response.length).toBe(3);
  });

  test('chat detail', async () => {
    const chat = await chatFactory({});

    const qry = `
      query chatDetail($_id: String!) {
        chatDetail(_id: $_id) {
          _id
        }
      }
    `;

    const response = await graphqlRequest(qry, 'chatDetail', { _id: chat._id });

    expect(response._id).toBe(chat._id);
  });
});
