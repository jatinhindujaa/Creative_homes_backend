import { Area } from "../models/areas.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const createArea = asyncHandler(async (req, res) => {
  const { name, order } = req.body;

  if (
    !name ||
    !order
  ) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

const imageLocalPath = req.files?.image?.[0]?.path;
const mobileImageLocalPath = req.files?.mobileImage?.[0]?.path;
let image = null;
let mobileImage = null;
if (imageLocalPath) {
  image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }
}

if (mobileImageLocalPath) {
  mobileImage = await uploadOnCloudinary(mobileImageLocalPath); // Upload mobile image to Cloudinary
  if (!mobileImage) {
    throw new ApiError(
      500,
      "Failed to upload the mobile image. Please try again"
    );
  }
}

  const area = await Area.create({
    name,
    order,
    ...(image && { image }), // only add image if it exists
    ...(mobileImage && { mobileImage }),
    status: true, // default status as false for approval
  });

  const savedArea = await Area.findById(area._id);
  if (!savedArea) {
    throw new ApiError(500, "Error creating area in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, savedArea, "Area created successfully"));
});

const getAllAreas = asyncHandler(async (req, res) => {
  const areas = await Area.find();
  if (!areas || areas.length === 0) {
    throw new ApiError(500, "Something went wrong while fetching the Areas");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Areas fetched successfully", areas));
});

const updateArea = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { name, phoneNo, designation, about, status, type } = req.body;

  const area = await Area.findById(id);
  if (!area) {
    throw new ApiError(404, "Area not found");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (phoneNo) updatedFields.phoneNo = phoneNo;
  if (designation) updatedFields.designation = designation;
  if (about) updatedFields.about = about;
  if (type) updatedFields.type = type;
  if (status !== undefined) {
    updatedFields.status = status === "true"; // ✅ convert string to boolean
  }

  const updatedArea = await Area.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!updatedArea) {
    throw new ApiError(500, "Error updating area in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedArea, "Area updated successfully"));
});

const deleteArea = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Area ID is required");
  }

  const area = await Area.findById(id);
  if (!area) {
    throw new ApiError(404, "Area not found");
  }

  const deletedArea = await Area.findByIdAndDelete(id);

  if (!deletedArea) {
    throw new ApiError(500, "Error deleting area from database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { id }, "Area deleted successfully"));
});

const getAreaById = asyncHandler(async (req, res) => {
  const { _id } = req.query;

  if (!_id) {
    throw new ApiError(400, "Area ID is required");
  }

  const area = await Area.findById(_id);
  if (!area) {
    throw new ApiError(404, "Area not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, area, "Area fetched successfully"));
});

const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!req.query.id) {
    throw new ApiError(400, "Area ID is required");
  }

  const area = await Area.findById(id);
  if (!area) {
    throw new ApiError(404, "Area not found");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Area image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  const updatedArea = await Area.findByIdAndUpdate(
    req.query.id,
    { $set: { image } },
    { new: true }
  );
  if (!updatedArea) {
    throw new ApiError(500, "Something went wrong while updating area image");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Area Image updated successfully", updatedArea)
    );
});

export {
  createArea,
  getAllAreas,
  updateArea,
  deleteArea,
  getAreaById,
  updateImage,
};
