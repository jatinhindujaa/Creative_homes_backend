import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Brochure } from "../models/brochure.model.js";

const createBrochure = asyncHandler(async (req, res) => {
  const { name, email, phone, message, propertyid } = req.body;

  if (!email || !name || !phone || !message || !propertyid) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Brochure.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});

// const getAllBrochure = asyncHandler(async (req, res) => {
//   const contacts = await Brochure.find();

//   if (!contacts) {
//     throw new ApiError(500, "Something went wrong!!!");
//   }

//   res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
// });
const getAllBrochure = asyncHandler(async (req, res) => {
  const brochureList = await Brochure.find().populate("propertyid", "name");
console.log("brochureList", brochureList);
  if (!brochureList) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  // Manually add propertyName to each item
  const enrichedBrochureList = brochureList.map((item) => {
    return {
      ...item._doc,
      propertyName: item.propertyid?.name || "N/A",
    };
  });

  res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Brochures fetched successfully!",
        enrichedBrochureList
      )
    );
});


export { createBrochure, getAllBrochure };
