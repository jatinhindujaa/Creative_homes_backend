import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Brousher } from "../models/brousher.model.js";

const createBrousher = asyncHandler(async (req, res) => {
  const { name, email, phone, message, propertyid } = req.body;

  if (!email || !name || !phone || !message || !propertyid) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const contact = await Brousher.create(req.body);

  if (!contact) {
    throw new ApiError(500, "Something went wrong while creating the contact");
  }

  res.status(200).json(new ApiResponse(200, "Contact created!!!", contact));
});

// const getAllBrousher = asyncHandler(async (req, res) => {
//   const contacts = await Brousher.find();

//   if (!contacts) {
//     throw new ApiError(500, "Something went wrong!!!");
//   }

//   res.status(200).json(new ApiResponse(200, "Whatapp found!!!", contacts));
// });
const getAllBrousher = asyncHandler(async (req, res) => {
  const brousherList = await Brousher.find().populate("propertyid", "name");
console.log("brousherList", brousherList);
  if (!brousherList) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  // Manually add propertyName to each item
  const enrichedBrousherList = brousherList.map((item) => {
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
        "Broushers fetched successfully!",
        enrichedBrousherList
      )
    );
});


export { createBrousher, getAllBrousher };
