import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createTeam,
  getAllTeam,
  updateTeam,
  deleteTeam,
  updateImage,
} from "../controllers/team.controller.js";

const router = Router();

router.route("/create").post(
  // verifyJwt,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createTeam
);
router.route("/get-all").get(getAllTeam);
router.route("/update").post(
  // verifyJwt,
  updateTeam
);
router.route("/update-image").post(
  // verifyJwt,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateImage
);
router.route("/delete").get(
  // verifyJwt,
  deleteTeam
);

export default router;
