import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  getAllAgents,
  updateAgent,
  deleteAgent,
  getAgentById,
  updateImage,
} from "../controllers/agent.controller.js";
import multer from "multer";
import { createArea, getAllAreas } from "../controllers/areas.controller.js";

const router = Router();

const uploadText = multer();

router.route("/create").post(
  // verifyJwt,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "mobileImage", maxCount: 1 },
  ]),
  createArea
);
router.route("/get-all").get(getAllAreas);
router.route("/update").post(
  // verifyJwt,
  uploadText.none(),
  updateAgent
);
router.route("/delete").get(
  // verifyJwt,
  deleteAgent
);
router.route("/get-by-id").get(getAgentById);
router.route("/update-image").post(
  // verifyJwt,
  upload.fields([{ name: "image", maxCount: 1 }]),
  updateImage
);

export default router;
