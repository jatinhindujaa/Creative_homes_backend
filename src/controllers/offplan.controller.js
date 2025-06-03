// import { ApiError } from "../utils/ApiError.js";
// import { ApiResponse } from "../utils/ApiResponse.js";
// import { asyncHandler } from "../utils/asyncHandler.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
// import { Offplan } from "../models/offplan.model.js";

// const createOffplan = asyncHandler(async (req, res) => {
//   const {
//     name,
//     features,
//     amenities,
//     price,
//     type,
//     bed,
//     shower,
//     bua,
//     plot,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     dealType,
//     agent,
//   } = req.body;

//   if (
//     !name ||
//     !features ||
//     !price ||
//     !type ||
//     !bed ||
//     !shower ||
//     !bua ||
//     !plot ||
//     !shortDescription ||
//     !description ||
//     !dealType ||
//     !agent ||
//     !reference ||
//     !zone ||
//     !dld ||
//     !amenities
//   ) {
//     throw new ApiError(400, "Please fill the required fields!!!");
//   }

//   const multipleImages = [];

//   if (
//     !req.files ||
//     !req.files.multipleImages ||
//     req.files.multipleImages.length === 0
//   ) {
//     throw new ApiError(400, "At least one image is required.");
//   }

//   for (let i = 0; i < req.files.multipleImages.length; i++) {
//     const imageUrl = await uploadOnCloudinary(req.files.multipleImages[i].path);
//     if (!imageUrl) {
//       throw new ApiError(
//         500,
//         "Error uploading image to Cloudinary - No URL returned"
//       );
//     }
//     multipleImages.push(imageUrl);
//   }
//   const imageLocalPath = req.files?.image[0]?.path;
//   if (!imageLocalPath) {
//     throw new ApiError(400, "Please upload a news image");
//   }

//   const image = await uploadOnCloudinary(imageLocalPath);
//   if (!image) {
//     throw new ApiError(500, "Failed to upload the image. Please try again");
//   }
//   const offplan = await Offplan.create({
//     name,
//     features,
//     amenities,
//     price,
//     type,
//     bed,
//     shower,
//     bua,
//     plot,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     multipleImages,
//     dealType,
//     agent,
//     status: false,
//     image,
//   });

//   const savedOffplan = await Offplan.findById(offplan._id);
//   if (!savedOffplan) {
//     throw new ApiError(500, "Error creating offplan in database");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, savedOffplan, "Offplan created successfully"));
// });

// const getAllProperties = asyncHandler(async (req, res) => {
//   const properties = await Offplan.find();
// //   if (!properties || properties.length === 0) {
// //     throw new ApiError(
// //       500,
// //       "Something went wrong while fetching the Properties"
// //     );
// //   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, "Properties fetched successfully", properties));
// });

// const updateOffplan = asyncHandler(async (req, res) => {
//   const { id } = req.query;
//   const {
//     name,
//     features,
//     amenities,
//     price,
//     type,
//     bed,
//     shower,
//     bua,
//     plot,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     dealType,
//     agent,
//     status,
//     // agent,
//   } = req.body;

//   const offplan = await Offplan.findById(id);
//   if (!offplan) {
//     throw new ApiError(404, "Offplan not found");
//   }

//   const updatedFields = {};
//   if (name) updatedFields.name = name;
//   if (features) updatedFields.features = features;
//   if (price) updatedFields.price = price;
//   if (type) updatedFields.type = type;
//   if (bed) updatedFields.bed = bed;
//   if (shower) updatedFields.shower = shower;
//   if (bua) updatedFields.bua = bua;
//   if (reference) updatedFields.reference = reference;
//   if (zone) updatedFields.zone = zone;
//   if (dld) updatedFields.dld = dld;
//   if (amenities) updatedFields.amenities = amenities;
//   if (plot) updatedFields.plot = plot;
//   if (shortDescription) updatedFields.shortDescription = shortDescription;
//   if (description) updatedFields.description = description;
//   if (status !== undefined) updatedFields.status = status;
//   if (dealType) updatedFields.dealType = dealType;
//   if (agent) updatedFields.agent = agent;

//   const updatedOffplan = await Offplan.findByIdAndUpdate(
//     id,
//     { $set: updatedFields },
//     { new: true, runValidators: true }
//   );

//   if (!updatedOffplan) {
//     throw new ApiError(500, "Error updating offplan in database");
//   }

//   res
//     .status(200)
//     .json(
//       new ApiResponse(200, updatedOffplan, "Offplan updated successfully")
//     );
// });

// const deleteOffplan = asyncHandler(async (req, res) => {
//   const { id } = req.query;

//   if (!id) {
//     throw new ApiError(400, "Offplan ID is required");
//   }

//   const offplan = await Offplan.findById(id);
//   if (!offplan) {
//     throw new ApiError(404, "Offplan not found");
//   }

//   const deletedOffplan = await Offplan.findByIdAndDelete(id);

//   if (!deletedOffplan) {
//     throw new ApiError(500, "Error deleting offplan from database");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, { id }, "Offplan deleted successfully"));
// });

// const getOffplanById = asyncHandler(async (req, res) => {
//   const { _id } = req.query;

//   if (!_id) {
//     throw new ApiError(400, "Offplan ID is required");
//   }

//   const offplan = await Offplan.findById(_id);
//   if (!offplan) {
//     throw new ApiError(404, "Offplan not found");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, offplan, "Offplan fetched successfully"));
// });

// const updateMultipleImages = asyncHandler(async (req, res) => {
//   const { id } = req.query;
//   if (!req.query.id) {
//     throw new ApiError(400, "Offplan ID is required");
//   }

//   const offplan = await Offplan.findById(id);
//   if (!offplan) {
//     throw new ApiError(404, "Offplan not found");
//   }

//   if (
//     !req.files ||
//     !req.files.multipleImages ||
//     req.files.multipleImages.length === 0
//   ) {
//     throw new ApiError(400, "At least one image is required.");
//   }

//   const multipleImages = [];

//   for (let i = 0; i < req.files.multipleImages.length; i++) {
//     const imageUrl = await uploadOnCloudinary(req.files.multipleImages[i].path);
//     if (!imageUrl) {
//       throw new ApiError(
//         500,
//         "Error uploading image to Cloudinary - No URL returned"
//       );
//     }
//     multipleImages.push(imageUrl);
//   }

//   const updatedOffplan = await Offplan.findByIdAndUpdate(
//     req.query.id,
//     { multipleImages },
//     { new: true }
//   );

//   res
//     .status(200)
//     .json(
//       new ApiResponse(200, updatedOffplan, "Offplan updated successfully")
//     );
// });

// const deleteMultipleImage = asyncHandler(async (req, res) => {
//   const offplan = await Offplan.findById(req.query.id);
//   const { index } = req.body;

//   if (!offplan) {
//     throw new ApiError(400, "No offplan found!!!");
//   }

//   if (index === undefined || index === null) {
//     throw new ApiError(400, "Index is required!!!");
//   }

//   const multipleImages = offplan.multipleImages;
//   if (multipleImages.length <= 1) {
//     throw new ApiError(400, "Images can not be 0, add more images to delete.");
//   }

//   multipleImages.splice(index, 1);
//   const updatedOffplan = await Offplan.findByIdAndUpdate(
//     req.query.id,
//     { $set: { multipleImages } },
//     { new: true }
//   );

//   if (!updatedOffplan) {
//     throw new ApiError(500, "Something went while updating the offplan!!!");
//   }

//   res.status(200).json(new ApiResponse(200, "Image deleted.", updatedOffplan));
// });

// export {
//   createOffplan,
//   getAllProperties,
//   updateOffplan,
//   deleteOffplan,
//   getOffplanById,
//   updateMultipleImages,
//   deleteMultipleImage,
// };

import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Offplan } from "../models/offplan.model.js";

// const createOffplan = asyncHandler(async (req, res) => {
//   const {
//     name,
//     amenities,
//     price,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     dealType,
//     agent,
//     floorPlanCategories, // new payload (array)
//   } = req.body;

//   // Validate required fields
//   if (
//     !name ||
//     !price ||
//     !reference ||
//     !zone ||
//     !dld ||
//     !amenities ||
//     !shortDescription ||
//     !description ||
//     !dealType ||
//     !agent ||
//     !floorPlanCategories
//   ) {
//     throw new ApiError(
//       400,
//       "Please fill the required fields including floorPlanCategories!"
//     );
//   }

//   if (!Array.isArray(floorPlanCategories) || floorPlanCategories.length === 0) {
//     throw new ApiError(400, "floorPlanCategories must be a non-empty array");
//   }

//   const multipleImages = [];

//   if (
//     !req.files ||
//     !req.files.multipleImages ||
//     req.files.multipleImages.length === 0
//   ) {
//     throw new ApiError(400, "At least one image is required.");
//   }

//   for (let i = 0; i < req.files.multipleImages.length; i++) {
//     const imageUrl = await uploadOnCloudinary(req.files.multipleImages[i].path);
//     if (!imageUrl) {
//       throw new ApiError(
//         500,
//         "Error uploading image to Cloudinary - No URL returned"
//       );
//     }
//     multipleImages.push(imageUrl);
//   }

//   const imageLocalPath = req.files?.image?.[0]?.path;
//   if (!imageLocalPath) {
//     throw new ApiError(400, "Please upload a main image");
//   }

//   const image = await uploadOnCloudinary(imageLocalPath);
//   if (!image) {
//     throw new ApiError(
//       500,
//       "Failed to upload the main image. Please try again"
//     );
//   }

//   const offplan = await Offplan.create({
//     name,
//     amenities,
//     price,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     multipleImages,
//     dealType,
//     agent,
//     status: false,
//     image,
//     floorPlanCategories, // save new field here
//   });

//   const savedOffplan = await Offplan.findById(offplan._id);
//   if (!savedOffplan) {
//     throw new ApiError(500, "Error creating offplan in database");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, savedOffplan, "Offplan created successfully"));
// });

const createOffplan = asyncHandler(async (req, res) => {
  
  if (typeof req.body.floorPlanCategories === "string") {
    try {
      req.body.floorPlanCategories = JSON.parse(req.body.floorPlanCategories);
    } catch (err) {
      throw new ApiError(400, "Invalid JSON format for floorPlanCategories");
    }
  }
  const {
    name,
    views,
    amenities,
    price,
    firstpay,
    underpay,
    handoverpay,
    developer,
    handoverin,
    description,
    
    agent,
    floorPlanCategories,
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !views ||
    !price ||
    !amenities ||
    !description ||
    !agent ||
    !floorPlanCategories ||
     !firstpay||
    !underpay||
    !handoverpay||
    !developer||
    !handoverin
  ) {
    throw new ApiError(
      400,
      "Please fill all required fields including views, status and floorPlanCategories"
    );
  }

  if (!Array.isArray(views) || views.length === 0) {
    throw new ApiError(400, "views must be a non-empty array");
  }

  if (floorPlanCategories.length === 0) {
    throw new ApiError(400, "floorPlanCategories must be a non-empty array");
  }

  const multipleImages = [];

  if (
    !req.files ||
    !req.files.multipleImages ||
    req.files.multipleImages.length === 0
  ) {
    throw new ApiError(400, "At least one image is required.");
  }

  for (let i = 0; i < req.files.multipleImages.length; i++) {
    const imageUrl = await uploadOnCloudinary(req.files.multipleImages[i].path);
    if (!imageUrl) {
      throw new ApiError(
        500,
        "Error uploading image to Cloudinary - No URL returned"
      );
    }
    multipleImages.push(imageUrl);
  }

  const imageLocalPath = req.files?.image?.[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload a main image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(
      500,
      "Failed to upload the main image. Please try again"
    );
  }


  const offplan = await Offplan.create({
    name,
    views,
    amenities,
    price,
    firstpay,
    underpay,
    handoverpay,
    developer,
    handoverin,
    description,
    multipleImages,
    agent,
    image,
    floorPlanCategories,
    status: false,
  });

  const savedOffplan = await Offplan.findById(offplan._id);
  if (!savedOffplan) {
    throw new ApiError(500, "Error creating offplan in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, savedOffplan, "Offplan created successfully"));
});
const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Offplan.find();

  res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});

// const updateOffplan = asyncHandler(async (req, res) => {
//   const { id } = req.query;
//   const {
//     name,
//     amenities,
//     price,
//     reference,
//     zone,
//     dld,
//     shortDescription,
//     description,
//     dealType,
//     agent,
//     status,
//     floorPlanCategories, // new field for update
//   } = req.body;

//   const offplan = await Offplan.findById(id);
//   if (!offplan) {
//     throw new ApiError(404, "Offplan not found");
//   }

//   const updatedFields = {};
//   if (name) updatedFields.name = name;
//   if (price) updatedFields.price = price;
//   if (reference) updatedFields.reference = reference;
//   if (zone) updatedFields.zone = zone;
//   if (dld) updatedFields.dld = dld;
//   if (amenities) updatedFields.amenities = amenities;
//   if (shortDescription) updatedFields.shortDescription = shortDescription;
//   if (description) updatedFields.description = description;
//   if (status !== undefined) updatedFields.status = status;
//   if (dealType) updatedFields.dealType = dealType;
//   if (agent) updatedFields.agent = agent;
//   if (floorPlanCategories)
//     updatedFields.floorPlanCategories = floorPlanCategories;

//   const updatedOffplan = await Offplan.findByIdAndUpdate(
//     id,
//     { $set: updatedFields },
//     { new: true, runValidators: true }
//   );

//   if (!updatedOffplan) {
//     throw new ApiError(500, "Error updating offplan in database");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, updatedOffplan, "Offplan updated successfully"));
// });

// Remaining controller functions unchanged as they don't deal with floorPlanCategories

const updateOffplan = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const {
    name,
    views,
    amenities,
    price,
    firstpay,
    underpay,
    handoverpay,
    developer,
    handoverin,
    description,
    agent,
    floorPlanCategories,
  } = req.body;

  const offplan = await Offplan.findById(id);
  if (!offplan) {
    throw new ApiError(404, "Offplan not found");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (views) updatedFields.views = views;
  if (amenities) updatedFields.amenities = amenities;
  if (price) updatedFields.price = price;
  if (firstpay) updatedFields.firstpay = firstpay;
  if (underpay) updatedFields.underpay = underpay;
  if (handoverpay) updatedFields.handoverpay = handoverpay;
  if (developer) updatedFields.developer = developer;
  if (handoverin) updatedFields.handoverin = handoverin;
  if (description) updatedFields.description = description;
  if (agent) updatedFields.agent = agent;
  if (floorPlanCategories)
    updatedFields.floorPlanCategories = floorPlanCategories;

  const updatedOffplan = await Offplan.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!updatedOffplan) {
    throw new ApiError(500, "Error updating offplan in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedOffplan, "Offplan updated successfully"));
});

const deleteOffplan = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Offplan ID is required");
  }

  const offplan = await Offplan.findById(id);
  if (!offplan) {
    throw new ApiError(404, "Offplan not found");
  }

  const deletedOffplan = await Offplan.findByIdAndDelete(id);

  if (!deletedOffplan) {
    throw new ApiError(500, "Error deleting offplan from database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { id }, "Offplan deleted successfully"));
});

const getOffplanById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) {
    throw new ApiError(400, "Offplan ID is required");
  }

  const offplan = await Offplan.findById(_id);
  if (!offplan) {
    throw new ApiError(404, "Offplan not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, offplan, "Offplan fetched successfully"));
});

const updateMultipleImages = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!req.query.id) {
    throw new ApiError(400, "Offplan ID is required");
  }

  const offplan = await Offplan.findById(id);
  if (!offplan) {
    throw new ApiError(404, "Offplan not found");
  }

  if (
    !req.files ||
    !req.files.multipleImages ||
    req.files.multipleImages.length === 0
  ) {
    throw new ApiError(400, "At least one image is required.");
  }

  const multipleImages = [];

  for (let i = 0; i < req.files.multipleImages.length; i++) {
    const imageUrl = await uploadOnCloudinary(req.files.multipleImages[i].path);
    if (!imageUrl) {
      throw new ApiError(
        500,
        "Error uploading image to Cloudinary - No URL returned"
      );
    }
    multipleImages.push(imageUrl);
  }

  const updatedOffplan = await Offplan.findByIdAndUpdate(
    req.query.id,
    { multipleImages },
    { new: true }
  );

  res
    .status(200)
    .json(new ApiResponse(200, updatedOffplan, "Offplan updated successfully"));
});

const deleteMultipleImage = asyncHandler(async (req, res) => {
  const offplan = await Offplan.findById(req.query.id);
  const { index } = req.body;

  if (!offplan) {
    throw new ApiError(400, "No offplan found!!!");
  }

  if (index === undefined || index === null) {
    throw new ApiError(400, "Index is required!!!");
  }

  const multipleImages = offplan.multipleImages;
  if (multipleImages.length <= 1) {
    throw new ApiError(400, "Images can not be 0, add more images to delete.");
  }

  multipleImages.splice(index, 1);
  const updatedOffplan = await Offplan.findByIdAndUpdate(
    req.query.id,
    { $set: { multipleImages } },
    { new: true }
  );

  if (!updatedOffplan) {
    throw new ApiError(500, "Something went while updating the offplan!!!");
  }

  res.status(200).json(new ApiResponse(200, "Image deleted.", updatedOffplan));
});

export {
  createOffplan,
  getAllProperties,
  updateOffplan,
  deleteOffplan,
  getOffplanById,
  updateMultipleImages,
  deleteMultipleImage,
};
