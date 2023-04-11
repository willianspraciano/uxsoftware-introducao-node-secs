import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

export class UsersController {
  public async list(request: Request, response: Response) {
    const prisma = new PrismaClient();
    const users = await prisma.user.findMany();

    return response.status(200).json({
      users,
    });
  }
}
