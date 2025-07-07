import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { NewsEmail } from "../models/newsletter.model.js";

const createEmail = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await NewsEmail.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});

const getAllEmail = asyncHandler(async (req, res) => {
  const contacts = await NewsEmail.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
});

export { createEmail, getAllEmail };
