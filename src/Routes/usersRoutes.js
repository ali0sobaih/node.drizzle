import express from "express";
import usersController from "../Controllers/usersController.js";
import { validate } from "../Middlewares/validate.js";
import { createUserSchema } from "../validations/user.validation.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.post("/createuser", validate(createUserSchema), usersController.createUser);
router.get("/getusers", usersController.getAllUsers);
router.get("/byid/:id",usersController.getUserById);  

export default router;
