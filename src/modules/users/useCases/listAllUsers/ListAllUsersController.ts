import { Request, Response } from "express";

import { ListAllUsersUseCase } from "./ListAllUsersUseCase";

interface IRequest extends Request {
  headers: {
    user_id: string;
  };
}

class ListAllUsersController {
  constructor(private listAllUsersUseCase: ListAllUsersUseCase) {}

  handle(request: IRequest, response: Response): Response {
    const { user_id } = request.headers;

    try {
      const users = this.listAllUsersUseCase.execute({ user_id });

      return response.json(users);
    } catch (error) {
      return response.status(400).json({ error });
    }
  }
}

export { ListAllUsersController };
