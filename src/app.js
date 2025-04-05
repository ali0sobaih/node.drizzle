import dotenv from "dotenv";
dotenv.config();

import express from "express";
import usersRoutes from "./Routes/usersRoutes.js";
import authRoutes from "./Routes/authRoutes.js";
import booksRoutes from "./Routes/booksRoutes.js";

const app = express();


app.use(express.json());
app.use("/users", usersRoutes);
app.use("/auth", authRoutes);
app.use("/books", booksRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));