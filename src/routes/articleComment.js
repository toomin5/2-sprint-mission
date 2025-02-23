import express from "express";
import { PrismaClient } from "@prisma/client";
import { asyncHandler } from "./asyncHandler.js";

const router = express.Router();
const prisma = new PrismaClient();

router
  .post(
    "/:articleId/comment",
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
  )
  .get(
    "/:articleId/comment",
    asyncHandler(async (req, res) => {
      const { cursor } = req.query;
      const take = 10;
      const comments = await prisma.comment.findMany({
        where: { articleId: { not: null } },
        take,
        skip: cursor ? 1 : 0,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createdAt: "desc" }, // 댓글 최신순으로 정렬 (선택 사항)
        select: {
          id: true,
          content: true,
          createdAt: true,
        },
      });
      res.status(200).json(comments);
    })
  );

router
  .patch(
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
