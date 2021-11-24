import { Document, Schema } from 'mongoose';
import { field } from './utils';

export interface IChat {
  content: string;
}

export interface IChatDocument extends IChat, Document {
  _id: string;
  createdBy: string;
  createdAt: Date;
}

export interface IChatMessage {
  content: string;
}

export interface IChatMessageDocument extends IChatMessage, Document {
  _id: string;
  content: string;
  createdBy: string;
  createdAt: Date;
}

export const chatMessageSchema = new Schema({
  _id: field({ pkey: true }),
  content: field({ type: String, label: 'Content' }),
  createdAt: field({ type: Date, label: 'Created at' }),
  createdBy: field({ type: Date, label: 'Created by' })
});

export const chatSchema = new Schema({
  _id: field({ pkey: true }),
  name: field({ type: String }),
  createdAt: field({ type: Date, label: 'Created at' }),
  createdBy: field({ type: String, label: 'Created by' })
});
