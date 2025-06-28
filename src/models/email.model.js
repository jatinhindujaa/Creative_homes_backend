import mongoose, { Schema } from "mongoose";

const emailSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Email = mongoose.model("Email", emailSchema);
