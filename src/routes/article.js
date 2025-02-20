import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { asyncHandler } from "./asyncHandler.js";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

export default router;

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const article = await prisma.article.findMany({
      where: { id },
    });
    res.status(201).json(article);
  })
);
