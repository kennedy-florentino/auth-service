import { validate } from "class-validator";
import { Request, RequestHandler, Response } from "express";
import { BadRequestError } from "../helpers/api-errors";
import { CreateUserRequest } from "../requests/user";
import { UserService } from "../services/user";

export class UserController {
  public static create: RequestHandler = async (
    req: Request,
    res: Response
  ) => {
    const { name, email, password } = req.body;
    const createUserRequest = new CreateUserRequest({ name, email, password });
    const invalidAttributes = await validate(createUserRequest);

    if (invalidAttributes.length > 0)
      throw new BadRequestError({
        message: "Invalid user attributes",
        metadata: invalidAttributes.map((e) => ({
          property: e.property,
          constraints: e.constraints,
        })),
      });

    const newUser = await UserService.save(createUserRequest);

    res.status(201).json(newUser);
  };
}
