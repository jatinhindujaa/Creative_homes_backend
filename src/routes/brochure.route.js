import { Router } from "express";
import { createBrochure, getAllBrochure } from "../controllers/brochure.controller.js";

const router = Router();

router.route("/create").post(createBrochure);

router.route("/get-all-brochure").get(getAllBrochure);

export default router;
