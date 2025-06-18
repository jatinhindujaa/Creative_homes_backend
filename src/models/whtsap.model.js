import mongoose, { Schema } from "mongoose";

const whtsapSchema = new Schema(
  {
    type1: {
      type: String,
      required: true,
      trim: true,
    },
    type2: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Whtsap = mongoose.model("Whtsap", whtsapSchema);
