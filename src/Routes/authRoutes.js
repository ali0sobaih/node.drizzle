import express from "express";
import authController from "../Controllers/authController.js";
import { validate } from "../Middlewares/validate.js";
import { createUserSchema } from "../validations/user.validation.js";
import { becomeAuthor } from "../validations/user.validation.js";
import { loginSchema } from "../validations/user.validation.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.post('/register', validate(createUserSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.post(
    "/becomeAuthor",
    authMiddleware, 
    validate(becomeAuthor),
    authController.becomeAnAuther
  );


export default router;
