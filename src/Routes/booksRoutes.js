import express from "express";
import booksController from "../Controllers/booksController.js";
import { validate } from "../Middlewares/validate.js";
import { publishBookSchema } from "../validations/book.validation.js";
import { authMiddleware } from "../Middlewares/authMiddleware.js";


const router = express.Router();

router.post("/publishBook", authMiddleware ,validate(publishBookSchema), booksController.publishBook);
router.get('/showBooks', booksController.showBooks);
router.delete('/deleteBook/:id', booksController.deleteBook);

export default router;

