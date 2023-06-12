import { hash } from "bcrypt";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/user";
import { CreateUserRequest } from "../requests/user";
import { CreateUserResponse } from "../responses/create-user";

export class UserService {
  public static save = async (
    user: CreateUserRequest
  ): Promise<CreateUserResponse> => {
    const { name, email, password } = user;
    const userExists = await userRepository.findOneBy({ email });

    if (userExists)
      throw new BadRequestError({ message: "Email already taken!" });

    const hashPassword = await hash(password, 8);

    const newUser = await userRepository.save({
      name,
      email,
      password: hashPassword,
    });

    return new CreateUserResponse({ ...newUser });
  };
}
