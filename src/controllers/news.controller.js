import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { News } from "../models/news.model.js";

const getAllNews = asyncHandler(async (req, res) => {
  const news = await News.find();
  if (!news) {
    throw new ApiError(500, "Unable to fetch news items at this time");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "News items retrieved successfully", news));
});

const createNews = asyncHandler(async (req, res) => {
  const { title, date, shortDescription, description, status } = req.body;

  if (!title || !date || !shortDescription || !description) {
    throw new ApiError(
      400,
      "Please provide all required fields: title, date, short description, and description"
    );
  }

  const existingNews = await News.findOne({ title });
  if (existingNews) {
    throw new ApiError(400, "A news item with this title already exists");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload a news image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the image. Please try again");
  }

  const bannerLocalPath = req.files?.banner[0]?.path;
  if (!bannerLocalPath) {
    throw new ApiError(400, "Please upload a banner image");
  }

  const banner = await uploadOnCloudinary(bannerLocalPath);
  if (!banner) {
    throw new ApiError(500, "Failed to upload the banner. Please try again");
  }

  const news = await News.create({
    title,
    date,
    shortDescription,
    description,
    status: status !== undefined ? status : true,
    image,
    banner,
  });

  if (!news) {
    throw new ApiError(
      500,
      "Failed to create the news item. Please try again later"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "News item created successfully", news));
});

const updateNews = asyncHandler(async (req, res) => {
  const { title, date, shortDescription, description, status } = req.body;

  if (!title && !date && !shortDescription && !description && status == null) {
    throw new ApiError(400, "Please provide at least one field to update");
  }

  const doesExists = await News.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "News item not found");
  }

  const updatedNews = await News.findByIdAndUpdate(
    req.query.id,
    { $set: req.body },
    { new: true }
  );
  if (!updatedNews) {
    throw new ApiError(500, "Failed to update the news item. Please try again");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "News item updated successfully", updatedNews));
});

const deleteNews = asyncHandler(async (req, res) => {
  const doesExists = await News.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "News item not found");
  }

  const deletedNews = await News.findByIdAndDelete(req.query.id);
  if (!deletedNews) {
    throw new ApiError(500, "Failed to delete the news item. Please try again");
  }

  res.status(200).json(new ApiResponse(200, "News item deleted successfully"));
});

const updateImage = asyncHandler(async (req, res) => {
  const doesExists = await News.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "News item not found");
  }

  const imageLocalPath = req.files?.image[0]?.path;
  if (!imageLocalPath) {
    throw new ApiError(400, "Please upload a new image");
  }

  const image = await uploadOnCloudinary(imageLocalPath);
  if (!image) {
    throw new ApiError(500, "Failed to upload the new image. Please try again");
  }

  const updatedNews = await News.findByIdAndUpdate(
    req.query.id,
    { $set: { image } },
    { new: true }
  );

  if (!updatedNews) {
    throw new ApiError(
      500,
      "Failed to update the news image. Please try again"
    );
  }

  res
    .status(200)
    .json(new ApiResponse(200, "News image updated successfully", updatedNews));
});

const updateBanner = asyncHandler(async (req, res) => {
  const doesExists = await News.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "News item not found");
  }

  const bannerLocalPath = req.files?.banner[0]?.path;
  if (!bannerLocalPath) {
    throw new ApiError(400, "Please upload a new banner image");
  }

  const banner = await uploadOnCloudinary(bannerLocalPath);
  if (!banner) {
    throw new ApiError(
      500,
      "Failed to upload the new banner. Please try again"
    );
  }

  const updatedNews = await News.findByIdAndUpdate(
    req.query.id,
    { $set: { banner } },
    { new: true }
  );

  if (!updatedNews) {
    throw new ApiError(
      500,
      "Failed to update the news banner. Please try again"
    );
  }

  res
    .status(200)
    .json(
      new ApiResponse(200, "News banner updated successfully", updatedNews)
    );
});

const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.query.id);
  if (!news) {
    throw new ApiError(400, "News item not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, "News item retrieved successfully", news));
});

export {
  getAllNews,
  createNews,
  updateNews,
  deleteNews,
  updateImage,
  updateBanner,
  getNewsById,
};
