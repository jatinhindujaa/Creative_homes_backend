import { Router } from "express";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import { createListProperty, deleteListProperty, getAllListPropertys } from "../controllers/listproperty.controller.js";


const router = Router();

router.route("/create").post(createListProperty);
router.route("/get-all").get(
  // verifyJwt,
  getAllListPropertys
);
router.route("/delete").get(
  // verifyJwt,
  deleteListProperty
);

export default router;
