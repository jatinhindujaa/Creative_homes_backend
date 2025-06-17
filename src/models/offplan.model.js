


// import mongoose, { Schema } from "mongoose";

// const offplanSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     Views: {
//       type: [String],
//       required: true,
//       trim: true,
//     },
//     amenities: {
//       type: [String],
//       required: true,
//       trim: true,
//     },
//     price: {
//       type: Number,
//       required: true,
//     },
//     shortDescription: {
//       type: String,
//       required: true,
//     },
//     description: {
//       type: String,
//       required: true,
//     },
//     multipleImages: {
//       type: [String],
//       required: true,
//     },
//     status: {
//       type: Boolean,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     agent: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Agent",
//       required: true,
//     },
//   },
//   { timestamps: true }
// );

// export const Offplan = mongoose.model("Offplan", offplanSchema);


import mongoose, { Schema } from "mongoose";

const floorPlanSchema = new Schema({
  beds: {
    type: Number,
    required: true,
  },
  minSizeSqft: {
    type: Number,
    required: true,
  },
  maxSizeSqft: {
    type: Number,
    required: true,
  },
  icon: {
    type: String, // Optional icon URL or name
  },
  description: {
    type: String, // Optional extra info
  },
});

const categoryFloorPlansSchema = new Schema({
  categoryName: {
    type: String,
    required: true,
  },
  floorPlans: [floorPlanSchema],
});

const offplanSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    views: {
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
    firstpay: {
      type: String,
      required: true,
    },
    underpay: {
      type: String,
      required: true,
    },
    handoverpay: {
      type: String,
      required: true,
    },
    developer: {
      type: String,
      required: true,
    },
    handoverin: {
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

    floorPlanCategories: {
      type: [categoryFloorPlansSchema],
      default: [],
    },
  },
  { timestamps: true }
);

export const Offplan = mongoose.model("Offplan", offplanSchema);
