import { Router } from "express";
import {
  createOpening,
  getAllOpenings,
  updateOpening,
  deleteOpening,
  blockOpening,
  unblockOpening,
  getOpeningById,
} from "../controllers/opening.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/create").post(createOpening);
router.route("/update").post(updateOpening);
router.route("/delete").get( deleteOpening);
router.route("/getbyId").get(getOpeningById);
router.route("/block-opening").patch( blockOpening);
router.route("/unblock-opening").patch( unblockOpening);
router.route("/get-all").get(getAllOpenings);

export default router;
