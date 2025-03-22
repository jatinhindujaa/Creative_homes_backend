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
  shortDescription: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  banner: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
});

export const News = mongoose.model("News", newsSchema);
