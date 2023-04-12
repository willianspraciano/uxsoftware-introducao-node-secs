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

  public async create(request: Request, response: Response) {
    const prisma = new PrismaClient();

    const { name, email } = request.body;

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return response.status(200).json({
      user,
    });
  }

  public async show(request: Request, response: Response) {
    const prisma = new PrismaClient();

    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    return response.status(200).json({
      user,
    });
  }

  public async delete(request: Request, response: Response) {
    const prisma = new PrismaClient();

    const { id } = request.params;

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response) {
    const prisma = new PrismaClient();

    const { id } = request.params;
    const { name, email } = request.body;

    const userUpdated = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name: String(name),
        email: String(email),
      },
    });

    return response.status(200).json({
      user: userUpdated,
    });
  }
}
