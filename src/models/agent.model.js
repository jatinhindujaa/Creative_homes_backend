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
      required: true,
      trim: true,
    },
    // nationality: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
    // languages: {
    //   type: [String],
    //   required: true,
    // },
    phoneNo: {
      type: Number,
      required: true,
    },
    whatsapp: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    // experience: {
    //   type: String,
    //   required: true,
    // },
    // brokerLicense: {
    //   type: String,
    //   required: true,
    // },
    // reraNumber: {
    //   type: Number,
    //   required: true,
    // },
    about: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
);

export const Agent = mongoose.model("Agent", agentSchema);
