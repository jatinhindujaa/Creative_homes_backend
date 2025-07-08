import mongoose, { Schema } from "mongoose";

const openingSchema = new Schema(
  {
    position: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: false,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    jd: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Openings = mongoose.model("Openings", openingSchema);
