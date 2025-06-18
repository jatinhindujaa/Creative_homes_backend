//name -- string
//nationality -- string
//languages -- array of strings
//phoneNo -- number
//whatsapp -- number
//designation -- string
//experience -- string
//brokerLicense -- string
//reraNumber -- number
//about -- string
//image -- string
//status // boolean false default because of approval

import mongoose, { Schema } from "mongoose";

const agentSchema = new Schema(
  {
    name: {
      type: String,
      required: false,
      trim: true,
    },
    order: {
      type: Number,
      required: false,
      trim: true,
    },
    // nationality: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    languages: {
      type: [String],
      required: false,
      trim: true,
    },
    phoneNo: {
      type: Number,
      required: false,
    },

    designation: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },
    // brokerLicense: {
    //   type: String,
    //   required: true,
    // },
    // reraNumber: {
    //   type: Number,
    //   required: true,
    // },
    type: {
      type: [String],
      required: false,
    },

    about: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    status: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

export const Agent = mongoose.model("Agent", agentSchema);
