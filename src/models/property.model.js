// name // string
// features // array of string
// price // number done
// type // string
// bed // number
// shower // number
// bua // number
// plot // number
// shortDescription // string
// description // string
// multiple Images // array of string
// agent //object Id
//status // boolean false default because of approval

import mongoose, { Schema } from "mongoose";

const propertySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    features: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    bed: {
      type: Number,
      required: true,
    },
    shower: {
      type: Number,
      required: true,
    },
    bua: {
      type: Number,
      required: true,
    },
    plot: {
      type: Number,
      required: true,
    },
    shortDescription: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    multipleImages: {
      type: [String],
      required: true,
    },
    dealType: {
      type: String,
      required: true,
    },
    // agent: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Agent",
    //   required: true,
    // },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
