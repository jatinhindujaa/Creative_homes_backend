


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
    propertytype: {
      type: [String],
      required: true,
    },
    furnishingtype: {
      type: [String],
      required: true,
    },
    offeringtype: {
      type: [String],
      required: true,
    },
    propertycategory: {
      type: [String],
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
      required: false,
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
      required: false,
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
