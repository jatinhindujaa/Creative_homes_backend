import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Team } from "../models/team.model.js";

const createTeam = asyncHandler(async (req, res) => {
  const { name, designation, status } = req.body;

  if (!name || !designation) {
    throw new ApiError(
      400,
      "Please provide all required fields: name and designation"
    );
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload an image for the team member");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }

  const team = await Team.create({
    name,
    designation,
    image,
    status: status !== undefined ? status : true,
  });

  if (!team) {
    throw new ApiError(
      500,
      "Failed to create the team member. Please try again later"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Team member created successfully", team));
});

const getAllTeam = asyncHandler(async (req, res) => {
  const team = await Team.find();
  if (!team) {
    throw new ApiError(500, "Unable to fetch team members at this time");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Team members retrieved successfully", team));
});

const updateTeam = asyncHandler(async (req, res) => {
  const { name, designation, status } = req.body;

  if (!name && !designation && status == null) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  const doesExists = await Team.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "Team member not found");
  }

  const updatedTeam = await Team.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedTeam) {
    throw new ApiError(
      500,
      "Failed to update the team member. Please try again"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Team member updated successfully", updatedTeam)
    );
});

const deleteTeam = asyncHandler(async (req, res) => {
  const doesExists = await Team.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "Team member not found");
  }

  const deletedTeam = await Team.findByIdAndDelete(req.query.id);
  if (!deletedTeam) {
    throw new ApiError(
      500,
      "Failed to delete the team member. Please try again"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Team member deleted successfully"));
});

const updateImage = asyncHandler(async (req, res) => {
  const doesExists = await Team.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "Team member not found");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload a new image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the new image. Please try again");
  }

  const updatedTeam = await Team.findByIdAndUpdate(
    req.query.id,
    { $set: { image } },
    { new: true }
  );

  if (!updatedTeam) {
    throw new ApiError(
      500,
      "Failed to update the team member's image. Please try again"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Team member's image updated successfully",
        updatedTeam
      )
    );
});

export { createTeam, getAllTeam, updateTeam, deleteTeam, updateImage };
