import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createOffplan,
  getAllProperties,
  updateOffplan,
  deleteOffplan,
  getOffplanById,
  updateMultipleImages,
  deleteMultipleImage,
} from "../controllers/offplan.controller.js";
import multer from "multer";

const router = Router();

const uploadText = multer();

router.route("/create").post(
  // verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 14 },
    { name: "image", maxCount: 1 },
  ]),

  createOffplan
);
router.route("/get-all").get(getAllProperties);
router.route("/update").post(
  // verifyJwt,
  uploadText.none(),
  updateOffplan
);
router.route("/delete").get(
  // verifyJwt,
  deleteOffplan
);
router.route("/get-by-id").get(getOffplanById);
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
