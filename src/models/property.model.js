


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
      type: String,
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
      type: String,
      required: true,
    },
    shower: {
      type: String,
      required: true,
    },
    bua: {
      type: String,
      required: true,
    },
    plot: {
      type: String,
      required: true,
    },
    reference: {
      type: String,
      required: false,
    },
    zone: {
      type: String,
      required: true,
    },
    dld: {
      type: String,
      required: false,
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
    mobilemultipleImages: {
      type: [String],
      required: false,
    },
    featuredImage: {
      type: String,
      required: false,
    },
    dealType: {
      type: String,
      required: true,
    },
    order: {
      type: Number,
      required: false,
      trim: true,
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
    area: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Area",
      required: false,
    },
  },
  { timestamps: true }
);

export const Property = mongoose.model("Property", propertySchema);
