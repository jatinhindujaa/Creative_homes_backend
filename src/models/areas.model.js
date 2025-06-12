
import mongoose, { Schema } from "mongoose";

const areaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // languages:{
    //   type: String,
    //   required: FALSE,
    //   trim: true,
    // },
    order: {
      type: Number,
      required: false,
      trim: true,
    },
    multipleImages: {
      type: [String],
      required: true,
    },
    mobilemultipleImages: {
      type: [String],
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
