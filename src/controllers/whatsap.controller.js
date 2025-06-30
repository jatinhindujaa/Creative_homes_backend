
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Whtsap } from "../models/whtsap.model.js";

const createWhtsap = asyncHandler(async (req, res) => {
  const { type1, type2, phone } = req.body;
  console.log("req", req.body);

  if (!type1 || !type2 || !phone) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Whtsap.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});

const getAllWhatsapp = asyncHandler(async (req, res) => {
  const contacts = await Whtsap.find();

  if (!contacts) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
});


export {
  createWhtsap,
  getAllWhatsapp,
};
