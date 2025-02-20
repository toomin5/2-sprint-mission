import express from "express";
import * as dotenv from "dotenv";
import pkg from "@prisma/client"; // default export로 가져오기
import cors from "cors";
import { asyncHandler } from "./src/routes/asyncHandler.js";
import productRouter from "./src/routes/products.js";
import articleRouter from "./src/routes/article.js";
import commentRouter from "./src/routes/comment.js";

const {
  PrismaClient,
  PrismaClientValidationError,
  PrismaClientKnownRequestError,
} = pkg;

const prisma = new PrismaClient();

dotenv.config();

const app = express();

app.use(express.json());

app.use("/products", productRouter);
app.use("/articles", articleRouter);
app.use("/comments", commentRouter);

app.listen(process.env.PORT || 3000, () => {
  console.log(`server Started on ${process.env.PORT}!!`);
});
