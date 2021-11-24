import { Chats } from '../../../db/models';
import { IChat } from '../../../db/models/definitions/chats';

interface IChatEdit extends IChat {
  _id: string;
}

const chatMutations = {
  chatsAdd(_root, doc, { user }) {
    return Chats.createChat(doc, user._id);
  },

  chatsEdit(_root, { _id, ...doc }: IChatEdit) {
    return Chats.updateChat(_id, doc);
  },

  chatsRemove(_root, { _id }) {
    return Chats.removeChat(_id);
  }
};

export default chatMutations;
