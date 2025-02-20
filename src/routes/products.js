import pkg from "@prisma/client";
const { PrismaClient } = pkg;
import { asyncHandler } from "./asyncHandler.js";
import express from "express";

const router = express.Router();
const prisma = new PrismaClient();

router
  .get(
    "/",
    asyncHandler(async (req, res) => {
      const { offset = 0, limit = 10, order = "recent" } = req.query;
      const orderBy =
        order === "recent" ? { createdAt: "desc" } : { createdAt: "asc" };

      const products = await prisma.product.findMany({
        orderBy,
        skip: parseInt(offset),
        take: parseInt(limit),
      });
      res.status(201).json(products);
    })
  )
  .post(
    "/",
    asyncHandler(async (req, res) => {
      const { name, description, price, tags } = req.body;
      const newProduct = await prisma.product.create({
        data: { name, description, price, tags },
      });
      res.status(201).json(newProduct);
    })
  );

router
  .get(
    "/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const product = await prisma.product.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          description: true,
          price: true,
          tags: true,
          createdAt: true,
        },
      });
      res.status(201).json(product);
    })
  )
  .delete(
    "/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const deleteProduct = await prisma.product.delete({
        where: { id },
      });
      res.status(201).json({ message: "delete complete" });
    })
  )
  .patch(
    "/:id",
    asyncHandler(async (req, res) => {
      const { id } = req.params;
      const { name, description, price, tags } = req.body;
      const patchProduct = await prisma.product.update({
        where: { id },
        data: { name, description, price, tags },
      });
      res.status(201).json({ message: "patched" });
    })
  );

export default router;
