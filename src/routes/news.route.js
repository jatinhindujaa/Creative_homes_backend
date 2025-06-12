import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createNews,
  getAllNews,
  updateNews,
  deleteNews,
  updateImage,
  updateBanner,
  getNewsById,
  updateMobileImage,
} from "../controllers/news.controller.js";

const router = Router();

router.route("/create").post(
  //   verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 1 },
    { name: "mobilemultipleImages", maxCount: 1 },
  ]),
  createNews
);
router.route("/get-all").get(getAllNews);
router.route("/update").post(
  // verifyJwt,
  upload.fields([
    { name: "multipleImages", maxCount: 1 },
    { name: "mobilemultipleImages", maxCount: 1 },
  ]),
  updateNews
);
router.route("/delete").get(
  // verifyJwt,
  deleteNews
);
router.route("/update-image").post(
  // verifyJwt,
  upload.fields([
    { name: "image", maxCount: 1 },
  ]),
  updateImage
);


router.route("/update-mobile-image").post(
  // verifyJwt,
  upload.fields([
    { name: "mobileImage", maxCount: 1 },
  ]),
  updateMobileImage
);
router.route("/update-banner").post(
  // verifyJwt,
  upload.fields([{ name: "banner", maxCount: 1 }]),
  updateBanner
);
router.route("/get-by-id").get(getNewsById);

export default router;
