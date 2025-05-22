import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { Agent } from "../models/agent.model.js";

const createAgent = asyncHandler(async (req, res) => {
  const {
    name,
    phoneNo,
    designation,
    about,
  } = req.body;

  if (
    !name ||
    // !nationality ||
    // !languages ||
    !phoneNo ||
    !designation ||
    // !experience ||
    // !brokerLicense ||
    // !reraNumber ||
    !about
  ) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Agent image is requried");
  }
  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  const agent = await Agent.create({
    name,
    phoneNo,
    designation,
    about,
    image,
    status: true, // default status as false for approval
  });

  const savedAgent = await Agent.findById(agent._id);
  if (!savedAgent) {
    throw new ApiError(500, "Error creating agent in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, savedAgent, "Agent created successfully"));
});

const getAllAgents = asyncHandler(async (req, res) => {
  const agents = await Agent.find();
  if (!agents || agents.length === 0) {
    throw new ApiError(500, "Something went wrong while fetching the Agents");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "Agents fetched successfully", agents));
});

const updateAgent = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const {
    name,
    phoneNo,
    designation,
    about,
    status,
  } = req.body;

  const agent = await Agent.findById(id);
  if (!agent) {
    throw new ApiError(404, "Agent not found");
  }

  const updatedFields = {};
  if (name) updatedFields.name = name;
  if (phoneNo) updatedFields.phoneNo = phoneNo;
  if (designation) updatedFields.designation = designation;
  if (about) updatedFields.about = about;
if (status !== undefined) {
  updatedFields.status = status === "true"; // ✅ convert string to boolean
}

  const updatedAgent = await Agent.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );

  if (!updatedAgent) {
    throw new ApiError(500, "Error updating agent in database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedAgent, "Agent updated successfully"));
});

const deleteAgent = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Agent ID is required");
  }

  const agent = await Agent.findById(id);
  if (!agent) {
    throw new ApiError(404, "Agent not found");
  }

  const deletedAgent = await Agent.findByIdAndDelete(id);

  if (!deletedAgent) {
    throw new ApiError(500, "Error deleting agent from database");
  }

  res
    .status(200)
    .json(new ApiResponse(200, { id }, "Agent deleted successfully"));
});

const getAgentById = asyncHandler(async (req, res) => {
  const { id } = req.query;

  if (!id) {
    throw new ApiError(400, "Agent ID is required");
  }

  const agent = await Agent.findById(id);
  if (!agent) {
    throw new ApiError(404, "Agent not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, agent, "Agent fetched successfully"));
});

const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.query;
  if (!req.query.id) {
    throw new ApiError(400, "Agent ID is required");
  }

  const agent = await Agent.findById(id);
  if (!agent) {
    throw new ApiError(404, "Agent not found");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Agent image is required");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Error uploading image to Cloudinary");
  }

  const updatedAgent = await Agent.findByIdAndUpdate(
    req.query.id,
    { $set: { image } },
    { new: true }
  );
  if (!updatedAgent) {
    throw new ApiError(500, "Something went wrong while updating agent image");
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "Agent Image updated successfully", updatedAgent)
    );
});

export {
  createAgent,
  getAllAgents,
  updateAgent,
  deleteAgent,
  getAgentById,
  updateImage,
};
