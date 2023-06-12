import { hash } from "bcrypt";
import { UserEntity } from "../entities/user";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/user";
import { SignUpRequest } from "../requests/sign-up";

export class SignUpService {
  public static save = async (user: SignUpRequest): Promise<UserEntity> => {
    const { name, email, password } = user;
    const userExists = await userRepository.findOneBy({ email });

    if (userExists)
      throw new BadRequestError({ message: "Email already taken!" });

    const hashPassword = await hash(password, 8);

    return await userRepository.save({
      name,
      email,
      password: hashPassword,
    });
  };
}
