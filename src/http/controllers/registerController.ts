import { FastifyRequest, FastifyReply } from "fastify"
import { z } from "zod"
import { registerUseCase } from "@/use-cases/register"

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    nome: z.string(),
    email: z.string(),
    password: z.string().min(6)
  })

  const { nome, email, password } = registerBodySchema.parse(request.body)

  try {
    await registerUseCase({
      nome,
      email,
      password
    })
  } catch (error) {
    return reply.status(409).send({ message: 'Alguns dados informados já existem em nossa base de dados' })
  }

  return reply.status(201).send()
}