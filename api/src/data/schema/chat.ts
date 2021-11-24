export const types = `
  type Chat {
    _id: String!
    createdDate: Date
  }
`;

export const queries = `
  chats: [Chat]
  chatDetail(_id: String!): Chat
`;

const commonMutationParams = `
  content: String!
`;

export const mutations = `
  chatsAdd(${commonMutationParams}): Chat
  chatsEdit(_id: String!, ${commonMutationParams}): Chat
  chatsRemove(_id: String!): JSON
`;
