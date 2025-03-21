import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createAgent,
  getAllAgents,
  updateAgent,
  deleteAgent,
  getAgentById,
  updateImage,
} from "../controllers/agent.controller.js";

const router = Router();

router.route("/create").post(
  // verifyJwt,
  upload.fields([{ name: "image", maxCount: 1 }]),
  createAgent
);
router.route("/get-all").get(getAllAgents);
router.route("/update").post(
  // verifyJwt,
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
