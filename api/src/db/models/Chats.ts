import { Model, model } from 'mongoose';
import {
  chatMessageSchema,
  chatSchema,
  IChat,
  IChatDocument,
  IChatMessage,
  IChatMessageDocument
} from './definitions/chats';

export interface IChatModel extends Model<IChatDocument> {
  getChat(_id: string): Promise<IChatDocument>;
  createChat(doc: IChat, createdId: string): IChatDocument;
  updateChat(_id: string, doc: IChat): IChatDocument;
  removeChat(_id: string): void;
}

export const loadClass = () => {
  class Chat {
    /*
     * Get a chat
     */
    public static async getChat(_id: string) {
      const chat = await Chats.findOne({ _id });

      if (!chat) {
        throw new Error('Chat not found');
      }

      return chat;
    }

    public static createChat(doc: IChat, createdId: string) {
      return Chats.create({
        ...doc,
        createdAt: new Date(),
        createdId
      });
    }

    public static async updateChat(_id: string, doc: IChat) {
      await Chats.updateOne({ _id }, { $set: doc });

      return Chats.findOne({ _id });
    }

    public static removeChat(_id: string) {
      return Chats.deleteOne({ _id });
    }
  }

  chatSchema.loadClass(Chat);

  return chatSchema;
};

loadClass();

export interface IChatMessageModel extends Model<IChatMessageDocument> {
  getChatMessage(_id: string): Promise<IChatMessageDocument>;
  createChatMessage(doc: IChat, createdId: string): IChatMessageDocument;
  updateChatMessage(_id: string, doc: IChatMessage): IChatMessageDocument;
  removeChatMessage(_id: string): void;
}

export const loadChatMessageClass = () => {
  class ChatMessage {
    /*
     * Get a chat message
     */
    public static async getChatMessage(_id: string) {
      const chatMessage = await ChatMessages.findOne({ _id });

      if (!chatMessage) {
        throw new Error('Chat message not found');
      }

      return chatMessage;
    }

    public static createChatMessage(doc: IChat, createdId: string) {
      return ChatMessages.create({
        ...doc,
        createdAt: new Date(),
        createdId
      });
    }

    public static async updateChatMessage(_id: string, doc: IChatMessage) {
      await ChatMessages.updateOne({ _id }, { $set: doc });

      return ChatMessages.findOne({ _id });
    }

    public static removeChatMessage(_id: string) {
      return ChatMessages.deleteOne({ _id });
    }
  }

  chatMessageSchema.loadClass(ChatMessage);

  return chatMessageSchema;
};

loadChatMessageClass();

// tslint:disable-next-line
const Chats = model<IChatDocument, IChatModel>('chats', chatSchema);

// tslint:disable-next-line
const ChatMessages = model<IChatMessageDocument, IChatMessageModel>(
  'chat_messages',
  chatMessageSchema
);

export { Chats, ChatMessages };
