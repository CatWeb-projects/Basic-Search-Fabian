import { Schema } from 'mongoose';

export const PersonModel = new Schema({
  name: { type: String, ref: 'Persons' }
});
