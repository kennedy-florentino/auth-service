import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/user";
import { SignInRequest } from "../requests/sign-in";

export class SignInService {
  public static signIn = async (
    signInRequest: SignInRequest
  ): Promise<string> => {
    const { email, password } = signInRequest;
    const user = await userRepository.findOneBy({ email });

    if (!user)
      throw new BadRequestError({ message: "Invalid user or password" });

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      throw new BadRequestError({ message: "Invalid user or password" });

    return sign({ id: user.id }, process.env.JWT_SECRET as string, {
      expiresIn: "8h",
    });
  };
}
