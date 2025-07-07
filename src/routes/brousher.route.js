import { Router } from "express";
import { createBrousher, getAllBrousher } from "../controllers/brousher.controller.js";

const router = Router();

router.route("/create").post(createBrousher);

router.route("/get-all-brousher").get(getAllBrousher);

export default router;
