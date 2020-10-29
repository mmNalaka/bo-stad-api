import { PrismaClient } from '@prisma/client'
export * from '@prisma/client'

let prisma: PrismaClient = new PrismaClient()

export default prisma
