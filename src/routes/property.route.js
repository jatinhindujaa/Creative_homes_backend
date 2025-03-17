import { Router } from "express";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";
import {
  createProperty,
  //   getAllProperties,
  //   updateProperty,
  //   deleteProperty,
  //   getPropertyById,
} from "../controllers/properties.controllers.js";

const router = Router();

router
  .route("/create")
  .post(
    verifyJwt,
    upload.fields([{ name: "images", maxCount: 6 }]),
    createProperty
  );
// router.route("/get-all").get(getAllProperties);
// router.route("/update").post(verifyJwt, updateProperty);
// router.route("/delete").get(verifyJwt, deleteProperty);
// router.route("/get-by-id").get(verifyJwt, getPropertyById);

export default router;
