import { Request, Response } from 'express';
import Zod from 'zod';

import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export class UsersController {
  public async list(request: Request, response: Response) {
    const users = await prisma.user.findMany();

    return response.status(200).json(users);
  }

  public async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      email: Zod.string().email(),
    }).strict();

    const { name, email } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new AppError('Email já cadastrado', 409);
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    });

    return response.status(200).json(user);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    return response.status(200).json(user);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }

  public async update(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3).nullish(),
      email: Zod.string().email().nullish(),
    }).strict();

    const { id } = request.params;
    const { name, email } = bodySchema.parse(request.body);

    let data = {};

    if (name) data = { name };
    if (email) data = { ...data, email };

    const userUpdated = await prisma.user.update({
      where: { id },
      data,
    });

    return response.status(200).json(userUpdated);
  }
}
