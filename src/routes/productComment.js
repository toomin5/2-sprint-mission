import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "./asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
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
);
router.patch(
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
);
router.delete(
  "/comment/:id",
  asyncHandler(async (req, res) => {
    const { id } = req.params;
    const deleteComment = await prisma.comment.delete({
      where: { id },
    });
    res.status(200).json({ message: "delete complete" });
  })
);
router.get(
  "/product/comment",
  asyncHandler(async (req, res) => {
    const { cursor } = req.query;
    const take = 10;
    const comments = await prisma.comment.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" }, // 댓글 최신순으로 정렬 (선택 사항)
      //include: { Product: true }, // Product 및 Article 모델 포함 (관계 확인용)
    });
    res.status(200).json(comments);
  })
);

export default router;
