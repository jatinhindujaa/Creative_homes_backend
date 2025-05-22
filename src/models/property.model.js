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
 // agent: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Agent",
    //   required: true,
    // },



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
      trim: true,
    },
    amenities: {
      type: [String],
      required: true,
      trim: true,
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
    reference: {
      type: String,
      required: true,
    },
    zone: {
      type: String,
      required: true,
    },
    dld: {
      type: String,
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

    status: {
      type: Boolean,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    agent: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Agent",
      required: true,
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
