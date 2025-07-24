import mongoose, { Schema } from "mongoose";

const brochureSchema = new Schema(
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
    message: {
      type: String,
      required: true,
      trim: true,
    },
    propertyid: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Brochure = mongoose.model("Brochure", brochureSchema);
