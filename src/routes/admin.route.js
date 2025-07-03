import { Router } from "express";
import { createAdmin, deleteAdmin, getAllAdmins, getById, login, updateAdmin } from "../controllers/admin.controller.js";


const router = Router();

router.route("/create").post(createAdmin);
router.route("/login").post(login);
router.route("/update").post(updateAdmin);
router.route("/get-all").get(getAllAdmins);
router.route("/get").get(getById);
router.route("/delete").get(deleteAdmin);

export default router;
