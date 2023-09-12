import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

prisma.user.create({
  data: {
    nome: "Alex",
    email: "mybols",
    password_hash: "Wm-sy-Xe-Vg-gO-sP"
  }
})
export const app = fastify();