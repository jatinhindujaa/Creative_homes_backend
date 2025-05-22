import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Property } from "../models/property.model.js";

const createProperty = asyncHandler(async (req, res) => {
  const {
    name,
    features,
    amenities,
    price,
    type,
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
    
  } = req.body;

  if (
    !name ||
    !features ||
    !price ||
    !type ||
    !bed ||
    !shower ||
    !bua ||
    !plot ||
    !shortDescription ||
    !description ||
    !dealType|| 
    !agent ||
    !reference||
    !zone||
    !dld||
    !amenities
  ) {
    throw new ApiError(400, "Please fill the required fields!!!");
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
  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload a news image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }
  const property = await Property.create({
    name,
    features,
    amenities,
    price,
    type,
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
    dealType,
    agent,
    status: false,
    image,
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
    type,
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
    // agent,
  } = req.body;

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (features) updatedFields.features = features;
  if (price) updatedFields.price = price;
  if (type) updatedFields.type = type;
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
  if (status !== undefined) updatedFields.status = status;
  if (dealType) updatedFields.dealType = dealType;
  if (agent) updatedFields.agent = agent;

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
      new ApiResponse(200, updatedProperty, "Property updated successfully")
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
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await Property.findById(id);
  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, property, "Property fetched successfully"));
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
};
