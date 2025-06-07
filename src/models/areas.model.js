
import mongoose, { Schema } from "mongoose";

const areaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    order: {
      type: Number,
      required: false,
      trim: true,
    },
    image: {
      type: String,
      required: true,
    },
    mobileImage: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export const Area = mongoose.model("Area", areaSchema);
