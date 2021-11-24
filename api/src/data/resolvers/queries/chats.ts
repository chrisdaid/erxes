import { Chats } from '../../../db/models';

const chartQueries = {
  chats() {
    return Chats.find();
  },

  chatDetail(_root, { _id }: { _id: String }) {
    return Chats.findOne({ _id });
  }
};

export default chartQueries;
