import { Careers } from "../models/careers.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

// const createCareer = asyncHandler(async (req, res) => {
//   const {
//     position,
//     name,
//     email,
//     phone,
//   } = req.body;

//   if (!position || !email || !name || !phone ) {
//     throw new ApiError(400, "Please fill the required fields!!!");
//   }
// const fileLocalPath = req.files?.resume ? req.files.resume[0]?.path : null;
// if (!fileLocalPath) {
//   throw new ApiError(400, "Resume is required!!!");
// }

//   const file = await uploadOnCloudinary(fileLocalPath);
//   console.log("file", file);
//   if (!file) {
//     throw new ApiError(500, "File failed to upload");
//   }
//   console.log("file2", file);

//   const career = await Careers.create({
//     position,
//     name,
//     email,
//     phone,
//     resume: file.url,
//   });
// console.log("career", career);
//   if (!career) {
//     throw new ApiError(
//       500,
//       "Something went wrong while creating the Career!!!"
//     );
//   }

//   return res
//     .status(200)
//     .json(new ApiResponse(200, "Career created successfully!!!", career));
// });


const createCareer = asyncHandler(async (req, res) => {
  const { position, name, email, phone } = req.body;

  if (!position || !email || !name || !phone) {
    throw new ApiError(400, "Please fill the required fields!!!");
  }

  const fileLocalPath = req.files?.resume?.[0]?.path || null;

  if (!fileLocalPath) {
    throw new ApiError(400, "Resume is required!!!");
  }

  const file = await uploadOnCloudinary(fileLocalPath);
  console.log("Cloudinary response:", file);

  if (!file) {
    // ✅ Changed this line
    throw new ApiError(500, "File failed to upload");
  }

  const career = await Careers.create({
    position,
    name,
    email,
    phone,
    resume: file, // ✅ Changed this line
  });

  console.log("career", career);

  if (!career) {
    throw new ApiError(
      500,
      "Something went wrong while creating the Career!!!"
    );
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Career created successfully!!!", career));
});
const getAllCareers = asyncHandler(async (req, res) => {
  const allCareers = await Careers.find();
  if (!allCareers) {
    throw new ApiError(
      500,
      "Something went wrong while finding the careers!!!"
    );
  }

  res.status(200).json(new ApiResponse(200, "Careers sent!!!", allCareers));
});

const deleteCareer = asyncHandler(async (req, res) => {
  const career = await Careers.findById(req.query.id);

  if (!career) {
    throw new ApiError(400, "No career found!!!");
  }

  const deletedCareer = await Careers.findByIdAndDelete(req.query.id);
  if (!deletedCareer) {
    throw new ApiError(500, "Something went wrong while deleting the career");
  }

  res.status(200).json(new ApiResponse(200, "Career deleted successfully!!!"));
});

const blockCareers = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const career = await Careers.findById(id);
  if (!career) {
    throw new ApiError(400, "Careers not found!!!");
  }

  // Update the status to false (blocked)
  career.status = false;

  const updatedCareers = await career.save();
  if (!updatedCareers) {
    throw new ApiError(
      500,
      "Something went wrong while blocking the Careers!!!"
    );
  }

  res.status(200).json(
    new ApiResponse(200, "Careers blocked successfully!!!", {
      career: updatedCareers,
    })
  );
});

// Unblock Careers function
const unblockCareers = asyncHandler(async (req, res) => {
  const { id } = req.query;

  const career = await Careers.findById(id);
  if (!career) {
    throw new ApiError(400, "Careers not found!!!");
  }

  // Update the status to true (unblocked)
  career.status = true;

  const updatedCareers = await career.save();
  if (!updatedCareers) {
    throw new ApiError(
      500,
      "Something went wrong while unblocking the Careers!!!"
    );
  }

  res.status(200).json(
    new ApiResponse(200, "Careers unblocked successfully!!!", {
      career: updatedCareers,
    })
  );
});
export {
  createCareer,
  getAllCareers,
  deleteCareer,
  unblockCareers,
  blockCareers,
};
