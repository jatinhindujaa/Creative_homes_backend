//title -- String
//date -- Date
//shortDescription -- String
//description -- String
//image -- String
//Banner -- [banner image] -- String
//status -- Boolean // for visblilty initialy send true

import mongoose, { Schema } from "mongoose";

const newsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  order: {
    type: Number,
    required: false,
    trim: true,
  },
  shortDescription: {
    type: String,
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
  status: {
    type: Boolean,
    required: true,
  },
});

export const News = mongoose.model("News", newsSchema);
