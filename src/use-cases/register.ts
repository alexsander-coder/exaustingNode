import { prisma } from "@/lib/prisma"
import { hash } from "bcryptjs"
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository"

interface RegisterUseCaseRequest {
  nome: string,
  email: string,
  password: string,
}

export async function registerUseCase({ nome, email, password }: RegisterUseCaseRequest) {

  const password_hash = await hash(password, 6)

  const userWithSaveEmail = await prisma.user.findUnique({
    where: {
      email
    }
  })


  if (userWithSaveEmail) {
    throw new Error('Email already exists.')
  }

  const prismaUsersRepository = new PrismaUsersRepository()

  await prismaUsersRepository.create({
    nome,
    email,
    password_hash
  })
}
