import mongoose, { Schema } from "mongoose";

const whtsapSchema = new Schema(
  {
    type: {
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
