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
  const { title, date, shortDescription, description, status,order } = req.body;

  if (!title || !date || !description) {
    throw new ApiError(
      400,
      "Please provide all required fields: title, date, short description, and description"
    );
  }
   const multipleImages = [];
   const mobilemultipleImages = [];
   if (req.files?.multipleImages && req.files.multipleImages.length > 0) {
     for (let i = 0; i < req.files.multipleImages.length; i++) {
       const imageUrl = await uploadOnCloudinary(
         req.files.multipleImages[i].path
       );
       if (!imageUrl) {
         throw new ApiError(
           500,
           "Error uploading image to Cloudinary - No URL returned"
         );
       }
       multipleImages.push(imageUrl);
     }
   }
   if (
     req.files?.mobilemultipleImages &&
     req.files.mobilemultipleImages.length > 0
   ) {
     for (let i = 0; i < req.files.mobilemultipleImages.length; i++) {
       const mobileImageUrl = await uploadOnCloudinary(
         req.files.mobilemultipleImages[i].path
       );
       if (!mobileImageUrl) {
         throw new ApiError(
           500,
           "Error uploading mobile image to Cloudinary - No URL returned"
         );
       }
       mobilemultipleImages.push(mobileImageUrl); // Push to mobilemultipleImages
     }
   }
//   const imageLocalPath = req.files?.image?.[0]?.path;
//   const mobileImageLocalPath = req.files?.mobileImage?.[0]?.path;
//   let image = null;
// let mobileImage = null;
//   if (imageLocalPath) {
//     image = await uploadOnCloudinary(imageLocalPath);
//     if (!image) {
//       throw new ApiError(500, "Failed to upload the image. Please try again");
//     }
//   }

//   if (mobileImageLocalPath) {
//     mobileImage = await uploadOnCloudinary(mobileImageLocalPath); // Upload mobile image to Cloudinary
//     if (!mobileImage) {
//       throw new ApiError(
//         500,
//         "Failed to upload the mobile image. Please try again"
//       );
//     }
//   }

  const news = await News.create({
    title,
    date,
    shortDescription,
    description,
    status: status !== undefined ? status : true,
    multipleImages,
    order,
    mobilemultipleImages,
  });
const savedNews = await News.findById(news._id);
  if (!savedNews) {
    throw new ApiError(500, "Error creating area in database");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "News item created successfully", savedNews));
});

const updateNews = asyncHandler(async (req, res) => {
  const { id } = req.query;
  const { title, date, shortDescription, description, status,order } = req.body;
const news = await News.findById(id);
 if (!news) {
   throw new ApiError(404, "news not found");
 }

 const updatedFields = {};
 if (title) updatedFields.title = title;
 if (date) updatedFields.date = date;
 if (shortDescription) updatedFields.shortDescription = shortDescription;
 if (description) updatedFields.description = description;
 if (order) updatedFields.order = order;
 if (status !== undefined) {
   updatedFields.status = status === "true"; // ✅ convert string to boolean
 }
  if (req.files?.multipleImages && req.files.multipleImages.length > 0) {
    const multipleImagesUrls = [];
    for (const file of req.files.multipleImages) {
      const url = await uploadOnCloudinary(file.path);
      if (!url) {
        throw new ApiError(500, "Failed to upload one of the property images");
      }
      multipleImagesUrls.push(url);
    }
    // Optionally append or replace existing multipleImages
    updatedFields.multipleImages = multipleImagesUrls;
  }
  if (
    req.files?.mobilemultipleImages &&
    req.files.mobilemultipleImages.length > 0
  ) {
    const mobilemultipleImagesUrls = [];
    for (const file of req.files.mobilemultipleImages) {
      const mobileImageUrl = await uploadOnCloudinary(file.path);
      if (!mobileImageUrl) {
        throw new ApiError(
          500,
          "Failed to upload one of the mobile property images"
        );
      }
      mobilemultipleImagesUrls.push(mobileImageUrl);
    }
    // Optionally append or replace existing mobilemultipleImages
    updatedFields.mobilemultipleImages = mobilemultipleImagesUrls;
  }
  const updatedNews = await News.findByIdAndUpdate(
    id,
    { $set: updatedFields },
    { new: true, runValidators: true }
  );
  if (!updatedNews) {
    throw new ApiError(500, "Failed to update the news item. Please try again");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedNews, "News item updated successfully"));
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

// const updateImage = asyncHandler(async (req, res) => {
//   const doesExists = await News.findById(req.query.id);
//   if (!doesExists) {
//     throw new ApiError(400, "News item not found");
//   }

//   const imageLocalPath = req.files?.image[0]?.path;
//   // if (!imageLocalPath) {
//   //   throw new ApiError(400, "Please upload a new image");
//   // }

//   const image = await uploadOnCloudinary(imageLocalPath);
//   if (!image) {
//     throw new ApiError(500, "Failed to upload the new image. Please try again");
//   }

//   const updatedNews = await News.findByIdAndUpdate(
//     req.query.id,
//     { $set: { image } },
//     { new: true }
//   );

//   if (!updatedNews) {
//     throw new ApiError(
//       500,
//       "Failed to update the news image. Please try again"
//     );
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, "News image updated successfully", updatedNews));
// });
// const updateImage = asyncHandler(async (req, res) => {
//   const doesExists = await News.findById(req.query.id);
//   if (!doesExists) {
//     throw new ApiError(400, "News item not found");
//   }

//   const imageLocalPath = req.files?.image?.[0]?.path;
//   const mobileImageLocalPath = req.files?.mobileImage?.[0]?.path;

//   let image = null;
//   let mobileImage = null;

//   // Upload the main image if it's provided
//   if (imageLocalPath) {
//     image = await uploadOnCloudinary(imageLocalPath);
//     if (!image) {
//       throw new ApiError(
//         500,
//         "Failed to upload the new image. Please try again"
//       );
//     }
//   }

//   // Upload the mobile image if it's provided
//   if (mobileImageLocalPath) {
//     mobileImage = await uploadOnCloudinary(mobileImageLocalPath);
//     if (!mobileImage) {
//       throw new ApiError(
//         500,
//         "Failed to upload the mobile image. Please try again"
//       );
//     }
//   }

//   // Prepare the update object
//   const updateData = {};
//   if (image) updateData.image = image;
//   if (mobileImage) updateData.mobileImage = mobileImage;

//   const updatedNews = await News.findByIdAndUpdate(
//     req.query.id,
//     { $set: updateData },
//     { new: true }
//   );

//   if (!updatedNews) {
//     throw new ApiError(
//       500,
//       "Failed to update the news image. Please try again"
//     );
//   }

//   res
//     .status(200)
//     .json(new ApiResponse(200, "News image updated successfully", updatedNews));
// });'
const uploadImage = async (filePath, imageType) => {
  const image = await uploadOnCloudinary(filePath);
  if (!image) {
    throw new ApiError(
      500,
      `Failed to upload the ${imageType} image. Please try again`
    );
  }
  return image;
};

const updateNewsImageField = async (id, imageType, imageLocalPath) => {
  if (imageLocalPath) {
    const image = await uploadImage(imageLocalPath, imageType);
    const updateData = { [imageType]: image };

    const updatedNews = await News.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedNews) {
      throw new ApiError(
        500,
        `Failed to update the ${imageType} image. Please try again`
      );
    }

    return updatedNews;
  }
  return null; // No image provided
};


const updateImage = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const doesExist = await News.findById(id);
  if (!doesExist) {
    throw new ApiError(400, "News item not found");
  }

  const imageLocalPath = req.files?.image?.[0]?.path;

  const updatedNews = await updateNewsImageField(id, "image", imageLocalPath);
  if (updatedNews) {
    return res
      .status(200)
      .json(
        new ApiResponse(200, "News image updated successfully", updatedNews)
      );
  }

  res.status(400).json(new ApiResponse(400, "No image provided to update"));
});

const updateMobileImage = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const doesExist = await News.findById(id);
  if (!doesExist) {
    throw new ApiError(400, "News item not found");
  }

  const mobileImageLocalPath = req.files?.mobileImage?.[0]?.path;

  const updatedNews = await updateNewsImageField(
    id,
    "mobileImage",
    mobileImageLocalPath
  );
  if (updatedNews) {
    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "News mobile image updated successfully",
          updatedNews
        )
      );
  }

  res
    .status(400)
    .json(new ApiResponse(400, "No mobile image provided to update"));
});



const updateBanner = asyncHandler(async (req, res) => {
  const doesExists = await News.findById(req.query.id);
  if (!doesExists) {
    throw new ApiError(400, "News item not found");
  }

  const bannerLocalPath = req.files?.banner[0]?.path;
  // if (!bannerLocalPath) {
  //   throw new ApiError(400, "Please upload a new banner image");
  // }

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
   const { _id } = req.query;
   if (!_id) {
     throw new ApiError(400, "Offplan ID is required");
   }
  const news = await News.findById(_id);
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
  updateMobileImage,
};
