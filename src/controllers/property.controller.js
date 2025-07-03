import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.model.js";
import mongoose from "mongoose";

const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    features,
    amenities,
    price,
    propertytype,
    furnishingtype,
    offeringtype,
    propertycategory,
    bed,
    shower,
    bua,
    plot,
    reference,
    zone,
    dld,
    shortDescription,
    description,
    dealType,
    agent,
    area,
    order,
  } = req.body;

  // if (
  //   !name ||
  //   !features ||
  //   !price ||
  //   !propertytype ||
  //   !furnishingtype ||
  //   !offeringtype ||
  //   !propertycategory ||
  //   !bed ||
  //   !shower ||
  //   !bua ||
  //   !plot ||
  //   !shortDescription ||
  //   !description ||
  //   !dealType ||
  //   !agent ||
  //   !zone ||
  //   !amenities ||
  //   !area ||
  //   !order
  // ) {
  //   throw new ApiError(400, "Please fill the required fields!!!");
  // }

  const multipleImages = [];
const mobilemultipleImages=[];

  if (req.files?.multipleImages && req.files.multipleImages.length > 0) {
    for (let i = 0; i < req.files.multipleImages.length; i++) {
      const imageUrl = await uploadOnCloudinary(
        req.files.multipleImages[i].path
      );
      if (!imageUrl) {
        throw new ApiError(
          500,
          "Error uploading image to Cloudinary - No URL returned"
        );
      }
      multipleImages.push(imageUrl);
    }
  }
  if (
    req.files?.mobilemultipleImages &&
    req.files.mobilemultipleImages.length > 0
  ) {
    for (let i = 0; i < req.files.mobilemultipleImages.length; i++) {
      const mobileImageUrl = await uploadOnCloudinary(
        req.files.mobilemultipleImages[i].path
      );
      if (!mobileImageUrl) {
        throw new ApiError(
          500,
          "Error uploading mobile image to Cloudinary - No URL returned"
        );
      }
      mobilemultipleImages.push(mobileImageUrl); // Push to mobilemultipleImages
    }
  }
let image = null;
let featuredImage = null;

const imageLocalPath = req.files?.image?.[0]?.path;
const featuredImageLocalPath = req.files?.featuredImage?.[0]?.path;

if (imageLocalPath) {
  image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }
}
if (featuredImageLocalPath) {
  featuredImage = await uploadOnCloudinary(featuredImageLocalPath);
  if (!featuredImage) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }
}
  
  const property = await Property.create({
    name,
    features,
    amenities,
    price,
    propertytype,
    furnishingtype,
    offeringtype,
    propertycategory,
    bed,
    shower,
    bua,
    plot,
    reference,
    zone,
    dld,
    shortDescription,
    description,
    multipleImages,
    mobilemultipleImages,
    dealType,
    order,
    agent,
    area,
    status: false,
    ...(image && { image }),
    ...(featuredImage && { featuredImage }),
  });

  const savedProperty = await Property.findById(property._id);
  if (!savedProperty) {
    throw new ApiError(500, "Error creating property in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, savedProperty, "Property created successfully"));
});

const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await Property.find();
  if (!properties || properties.length === 0) {
    throw new ApiError(
      500,
      "Something went wrong while fetching the Properties"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});

const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const {
    name,
    features,
    amenities,
    price,
    propertytype,
    furnishingtype,
    offeringtype,
    propertycategory,
    bed,
    shower,
    bua,
    plot,
    reference,
    zone,
    dld,
    shortDescription,
    description,
    dealType,
    agent,
    status,
    area,
    order,
  } = req.body;

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (features) updatedFields.features = features;
  if (price) updatedFields.price = price;
  if (bed) updatedFields.bed = bed;
  if (shower) updatedFields.shower = shower;
  if (bua) updatedFields.bua = bua;
  if (reference) updatedFields.reference = reference;
  if (zone) updatedFields.zone = zone;
  if (dld) updatedFields.dld = dld;
  if (amenities) updatedFields.amenities = amenities;
  if (plot) updatedFields.plot = plot;
  if (shortDescription) updatedFields.shortDescription = shortDescription;
  if (description) updatedFields.description = description;
  if (dealType) updatedFields.dealType = dealType;
  if (agent) updatedFields.agent = agent;
  if (area) updatedFields.area = area;
  if (order) updatedFields.order = order;
 if (status !== undefined) {
   updatedFields.status = status === "true"; // ✅ convert string to boolean
 }

  // if (area) {
  //   // Ensure area is a valid ObjectId or null
  //   if (mongoose.Types.ObjectId.isValid(area)) {
  //     updatedFields.area = area;
  //   } else {
  //     updatedFields.area = null; // Or skip the field if it's not valid
  //   }
  // }

  if (propertytype) updatedFields.propertytype = propertytype;
  if (furnishingtype) updatedFields.furnishingtype = furnishingtype;
  if (offeringtype) updatedFields.offeringtype = offeringtype;
  if (propertycategory) updatedFields.propertycategory = propertycategory;

  // Handle single QR image upload if provided
  if (req.files?.image && req.files.image.length > 0) {
    const uploadedImage = await uploadOnCloudinary(req.files.image[0].path);
    if (!uploadedImage) {
      throw new ApiError(500, "Failed to upload QR image");
    }
    updatedFields.image = uploadedImage;
  }
  if (req.files?.featuredImage && req.files.featuredImage.length > 0) {
    const uploadedImage = await uploadOnCloudinary(
      req.files.featuredImage[0].path
    );
    if (!uploadedImage) {
      throw new ApiError(500, "Failed to upload QR image");
    }
    updatedFields.featuredImage = uploadedImage;
  }

  // Handle multiple property images if provided
  if (req.files?.multipleImages && req.files.multipleImages.length > 0) {
    const multipleImagesUrls = [];
    for (const file of req.files.multipleImages) {
      const url = await uploadOnCloudinary(file.path);
      if (!url) {
        throw new ApiError(500, "Failed to upload one of the property images");
      }
      multipleImagesUrls.push(url);
    }
    // Optionally append or replace existing multipleImages
    updatedFields.multipleImages = multipleImagesUrls;
  }
 if (
   req.files?.mobilemultipleImages &&
   req.files.mobilemultipleImages.length > 0
 ) {
   const mobilemultipleImagesUrls = [];
   for (const file of req.files.mobilemultipleImages) {
     const mobileImageUrl = await uploadOnCloudinary(file.path);
     if (!mobileImageUrl) {
       throw new ApiError(
         500,
         "Failed to upload one of the mobile property images"
       );
     }
     mobilemultipleImagesUrls.push(mobileImageUrl);
   }
   // Optionally append or replace existing mobilemultipleImages
   updatedFields.mobilemultipleImages = mobilemultipleImagesUrls;
 }
  const updatedProperty = await Property.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!updatedProperty) {
    throw new ApiError(500, "Error updating property in database");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Property updated successfully", updatedProperty)
    );
});


const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const deletedProperty = await Property.findByIdAndDelete(id);

  if (!deletedProperty) {
    throw new ApiError(500, "Error deleting property from database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { id }, "Property deleted successfully"));
});

const getPropertyById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await Property.findById(_id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, property, "Property fetched successfully"));
});
// const getPropertyByAgentId = asyncHandler(async (req, res) => {
//   const { agent } = req.query;


//   const property = await Property.findById(agent);
//   if (!property) {
//     throw new ApiError(404, "Property not found");
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, property, "Property fetched successfully"));
// });

const getPropertyByAgentId = asyncHandler(async (req, res) => {
  const { agent } = req.query; // Extract agent ID from query

  if (!agent) {
    throw new ApiError(400, "Agent ID is required");
  }

  // Find properties associated with the agent
  const properties = await Property.find({ agent: agent }); // Assuming agent is a field in the Property model

  if (!properties || properties.length === 0) {
    throw new ApiError(404, "No properties found for this agent");
  }

  res
    .status(200)
    .json(new ApiResponse(200, properties, "Properties fetched successfully"));
});

// const getPropertyByArea = asyncHandler(async (req, res) => {
//   const { area } = req.query; // Extract agent ID from query

//   if (!area) {
//     throw new ApiError(400, "area ID is required");
//   }

//   // Find properties associated with the agent
//   const properties = await Property.find({ area: area }); // Assuming agent is a field in the Property model
// console.log("pro",properties)
//   // if (!properties || properties.length === 0) {
//   //   throw new ApiError(404, "No properties found for this agent");
//   // }

//   res
//     .status(200)
//     .json(new ApiResponse(200, properties, "Properties fetched successfully"));
// });

const getPropertyByArea = asyncHandler(async (req, res) => {
  const { area } = req.query; // Extract area ID from query

  if (!area) {
    throw new ApiError(400, "area ID is required");
  }

  // Find properties associated with the area
  const properties = await Property.find({ area: area }); // Find properties for the given area ID
  const propertiesCount = await Property.countDocuments({ area: area }); // Count the properties in the specified area

  console.log("properties:", properties);
  console.log("properties count:", propertiesCount);

  // Respond with both the properties and the count
  res.status(200).json(
    new ApiResponse(
      200,
      { properties, count: propertiesCount }, // Send properties and count in response
      "Properties fetched successfully"
    )
  );
});




const getPropertyByAreaId = asyncHandler(async (req, res) => {
  const { area } = req.query; // Extract agent ID from query

  if (!area) {
    throw new ApiError(400, "Area ID is required");
  }

  // Find properties associated with the agent
  const properties = await Property.find({ area: area }); // Assuming agent is a field in the Property model

  if (!properties || properties.length === 0) {
    throw new ApiError(404, "No properties found for this agent");
  }

  res
    .status(200)
    .json(new ApiResponse(200, properties, "Properties fetched successfully"));
});

const updateMultipleImages = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!req.query.id) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
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

  const updatedProperty = await Property.findByIdAndUpdate(
    req.query.id,
    { multipleImages },
    { new: true }
  );

  res
    .status(200)
    .json(
      new ApiResponse(200, updatedProperty, "Property updated successfully")
    );
});

const deleteMultipleImage = asyncHandler(async (req, res) => {
  const property = await Property.findById(req.query.id);
  const { index } = req.body;

  if (!property) {
    throw new ApiError(400, "No property found!!!");
  }

  if (index === undefined || index === null) {
    throw new ApiError(400, "Index is required!!!");
  }

  const multipleImages = property.multipleImages;
  if (multipleImages.length <= 1) {
    throw new ApiError(400, "Images can not be 0, add more images to delete.");
  }

  multipleImages.splice(index, 1);
  const updatedProperty = await Property.findByIdAndUpdate(
    req.query.id,
    { $set: { multipleImages } },
    { new: true }
  );

  if (!updatedProperty) {
    throw new ApiError(500, "Something went while updating the property!!!");
  }

  res.status(200).json(new ApiResponse(200, "Image deleted.", updatedProperty));
});

export {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
  updateMultipleImages,
  deleteMultipleImage,
  getPropertyByAgentId,
  getPropertyByArea,
};
