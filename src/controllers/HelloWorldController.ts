import { Request, Response } from 'express';

export class HelloWorldController {
  public async show(request: Request, response: Response) {
    return response.status(200).json({
      message: 'Hello world',
    });
  }
}
