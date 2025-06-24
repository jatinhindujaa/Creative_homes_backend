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
  getPropertyByAgentId,
  getPropertyByArea,
} from "../controllers/property.controller.js";
import multer from "multer";

const router = Router();

const uploadText = multer();

router.route("/create").post(
  // verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 14 },
    { name: "mobilemultipleImages", maxCount: 14 },
    { name: "image", maxCount: 1 },
  ]),

  createProperty
);
router.route("/get-all").get(getAllProperties);
router.route("/update").post(
  // verifyJwt,
  // uploadText.none(),
  upload.fields([
    { name: "multipleImages", maxCount: 14 },
    { name: "mobilemultipleImages", maxCount: 14 },
    { name: "image", maxCount: 1 },
  ]),
  updateProperty
);
router.route("/delete").get(
  // verifyJwt,
  deleteProperty
);
router.route("/get-by-id").get(getPropertyById);
router.route("/get-by-agentid").get(getPropertyByAgentId);
router.route("/get-by-areaid").get(getPropertyByArea);
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
