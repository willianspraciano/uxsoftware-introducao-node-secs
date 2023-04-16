import { Request, Response } from 'express';
import Zod from 'zod';
import { hash } from 'bcrypt';

import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';
import { excludeFields } from '../utils/excludeFields';

export class UsersController {
  public async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      email: Zod.string().email(),
      password: Zod.string().min(6),
      password_confirmation: Zod.string().min(6),
    })
      .strict()
      .refine((data) => data.password === data.password_confirmation, {
        message: "Passwords don't match",
        path: ['password_confirmation'],
      });

    const { name, email, password } = bodySchema.parse(request.body);

    const userExists = await prisma.user.findFirst({
      where: { email },
    });

    if (userExists) {
      throw new AppError('User already registered', 409);
    }

    const password_hash = await hash(password, 6);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password_hash,
      },
    });

    const userWithoutPassword = excludeFields(user, ['password_hash']);
    return response.status(200).json(userWithoutPassword);
  }

  public async list(_request: Request, response: Response) {
    const users = await prisma.user.findMany();

    const usersWithoutPassword = users.map((user) => {
      return excludeFields(user, ['password_hash']);
    });

    return response.status(200).json(usersWithoutPassword);
  }

  public async show(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return response.status(200).json(excludeFields(user, ['password_hash']));
  }

  public async update(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3).nullish(),
      email: Zod.string().email().nullish(),
    }).strict();

    const { name, email } = bodySchema.parse(request.body);
    const { id } = request.params;

    const userExists = await prisma.user.findUnique({
      where: { id },
    });

    if (!userExists) throw new AppError('User not found', 404);

    let data = {};

    if (name) data = { name };
    if (email) data = { ...data, email };

    const user = await prisma.user.update({
      where: { id },
      data,
    });

    return response.status(200).json(excludeFields(user, ['password_hash']));
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;

    const user = await prisma.user.findUnique({
      where: { id },
    });

    if (!user) throw new AppError('User not found', 404);

    await prisma.user.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}
