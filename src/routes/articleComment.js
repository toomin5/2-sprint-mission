import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "./asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router.post(
  "/article/:articleId/comment",
  asyncHandler(async (req, res) => {
    const { articleId } = req.params;
    const { content } = req.body;
    const comment = await prisma.comment.create({
      data: {
        content,
        article: { connect: { id: articleId } },
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
    const patchComment = await prisma.comment.update({
      where: { id },
      data: { content },
    });
    res.status(200).json(patchComment);
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
  "/article/comment",
  asyncHandler(async (req, res) => {
    const { cursor } = req.query;
    const take = 10;
    const comments = await prisma.comment.findMany({
      take,
      skip: cursor ? 1 : 0,
      cursor: cursor ? { id: cursor } : undefined,
      orderBy: { createdAt: "desc" }, // 댓글 최신순으로 정렬 (선택 사항)
      //include: { Article : true }, // Product 및 Article 모델 포함 (관계 확인용)
    });
    res.status(200).json(comments);
  })
);

export default router;
