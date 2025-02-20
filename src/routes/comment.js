import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "./asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/product/:productId",
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        Product: { connect: { id: productId } },
      },
    });
    res.status(201).json(comment);
  })
);

export default router;
