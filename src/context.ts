import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import db from '../db'

export interface Context {
  db: PrismaClient
  req: Request
  res: Response
}

export function createContext(props: Context) {
  return {
    ...props,
    db,
  }
}
