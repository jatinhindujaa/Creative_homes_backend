import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ListProperty } from "../models/listproperty.model.js";

const createListProperty = asyncHandler(async (req, res) => {
  const { name, email, phone, listingtype, propertyAddress, propertytype } =
    req.body;

  if (
    !name ||
    !email ||
    !phone ||
    !listingtype ||
    !propertyAddress ||
    !propertytype
  ) {
    throw new ApiError(400, "Please fill all required fields!!!");
  }

  const listproperty = await ListProperty.create(req.body);

  if (!listproperty) {
    throw new ApiError(500, "Something went wrong while creating the listproperty");
  }

  res.status(200).json(new ApiResponse(200, "ListProperty created!!!", listproperty));
});

const getAllListPropertys = asyncHandler(async (req, res) => {
  const listpropertys = await ListProperty.find();

  if (!listpropertys) {
    throw new ApiError(500, "Something went wrong!!!");
  }

  res.status(200).json(new ApiResponse(200, "ListPropertys found!!!", listpropertys));
});

const deleteListProperty = asyncHandler(async (req, res) => {
  const listproperty = await ListProperty.findById(req.query.id);
  if (!listproperty) {
    throw new ApiError(400, "No listproperty found!!!");
  }

  const deletedListProperty = await ListProperty.findByIdAndDelete(req.query.id);
  if (!deletedListProperty) {
    throw new ApiError(
      400,
      "Something went wrong while deleting the listproperty!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "ListProperty deleted!!!"));
});

export { createListProperty, getAllListPropertys, deleteListProperty };
