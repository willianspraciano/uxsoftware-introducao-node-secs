import { Request, Response } from 'express';
import Zod from 'zod';

import { prisma } from '../lib/prisma';
import { AppError } from '../errors/AppError';

export class TasksController {
  public async create(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3),
      time: Zod.string(),
    }).strict();

    const { name, time } = bodySchema.parse(request.body);
    const user_id = request.userId;

    const userExists = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userExists) throw new AppError('User not found', 404);

    const task = await prisma.task.create({
      data: {
        name,
        time,
        user_id,
      },
    });

    return response.status(200).json(task);
  }

  public async list(request: Request, response: Response) {
    const user_id = request.userId;

    const tasks = await prisma.task.findMany({
      where: {
        user_id,
      },
    });

    return response.status(200).json(tasks);
  }

  public async show(request: Request, response: Response) {
    const user_id = request.userId;
    const { id } = request.params;

    const task = await prisma.task.findFirst({
      where: { id, user_id },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    return response.status(200).json(task);
  }

  public async update(request: Request, response: Response) {
    const bodySchema = Zod.object({
      name: Zod.string().min(3).nullish(),
      time: Zod.string().nullish(),
    }).strict();

    const { name, time } = bodySchema.parse(request.body);

    const user_id = request.userId;
    const { id } = request.params;

    const taskExists = await prisma.task.findFirst({
      where: { id, user_id },
    });

    if (!taskExists) throw new AppError('Task not found', 404);

    let data = {};

    if (name) data = { name };
    if (time) data = { ...data, time };

    const task = await prisma.task.update({
      where: { id },
      data,
    });

    return response.status(200).json(task);
  }

  public async delete(request: Request, response: Response) {
    const { id } = request.params;
    const user_id = request.userId;

    const task = await prisma.task.findFirst({
      where: { id, user_id },
    });

    if (!task) throw new AppError('Task not found', 404);

    await prisma.task.delete({
      where: { id },
    });

    return response.status(204).json();
  }
}
