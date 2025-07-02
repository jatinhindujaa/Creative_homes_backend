import mongoose, { Schema } from "mongoose";

const listpropertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    listingtype: {
      type: String,
      required: true,
      trim: true,
    },
    propertytype: {
      type: String,
      required: true,
      trim: true,
    },
    propertyAddress: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const ListProperty = mongoose.model("ListProperty", listpropertySchema);
