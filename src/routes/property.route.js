import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createProperty,
  getAllProperties,
  updateProperty,
  deleteProperty,
  getPropertyById,
  updateMultipleImages,
  deleteMultipleImage,
} from "../controllers/property.controller.js";
import multer from "multer";

const router = Router();

const uploadText = multer();

router.route("/create").post(
  // verifyJwt,
  upload.fields([{ name: "multipleImages", maxCount: 14 }]),
  createProperty
);
router.route("/get-all").get(getAllProperties);
router.route("/update").post(
  // verifyJwt,
  uploadText.none(),
  updateProperty
);
router.route("/delete").get(
  // verifyJwt,
  deleteProperty
);
router.route("/get-by-id").get(getPropertyById);
router.route("/update-multiple-images").post(
  // verifyJwt,
  upload.fields([
    {
      name: "multipleImages",
      maxCount: 14,
    },
  ]),
  updateMultipleImages
);
router.route("/delete-multiple-image").post(
  // verifyJwt,
  deleteMultipleImage
);

export default router;
