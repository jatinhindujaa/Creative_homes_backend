import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { createArea, deleteArea, getAllAreas, getAreaById, updateArea, updateImage, updatemobileImage } from "../controllers/areas.controller.js";

const router = Router();

router.route("/create").post(
  // verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 1 },
    { name: "mobilemultipleImages", maxCount: 1 },
  ]),
  createArea
);
router.route("/get-all").get(getAllAreas);
router.route("/update").post(
  // verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 1 },
    { name: "mobilemultipleImages", maxCount: 1 },
  ]),
  updateArea
);
router.route("/delete").get(
  // verifyJwt,
  deleteArea
);
router.route("/get-by-id").get(getAreaById);
router.route("/update-image").post(
  // verifyJwt,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  updateImage
);

router.route("/update-mobile-image").post(
  // verifyJwt,
  upload.fields([{ name: "mobileImage", maxCount: 1 }]),
  updatemobileImage
);


export default router;
