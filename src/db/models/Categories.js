import { model, Schema } from 'mongoose';

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
  },
  { versionKey: false, timestamps: false },
);

export const Category = model('Category', categorySchema);
