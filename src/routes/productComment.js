import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "./asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router
  .post(
    "/products/:productId/comment",
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
  )
  .patch(
    "/comment/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const { content } = req.body;
      const updateComment = await prisma.comment.update({
        where: { id },
        data: { content },
      });
      res.status(200).json(updateComment);
    })
  )
  .delete(
    "/comment/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const deleteComment = await prisma.comment.delete({
        where: { id },
      });
      res.status(200).json({ message: "delete complete" });
    })
  );

export default router;
