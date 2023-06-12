import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/user";
import { SignInRequest } from "../requests/sign-in";
import { authConfig } from "../config/auth";

export class SignInService {
  public static signIn = async (
    signInRequest: SignInRequest
  ): Promise<{ accessToken: string; refreshToken: string }> => {
    const { email, password } = signInRequest;
    const user = await userRepository.findOneBy({ email });

    if (!user)
      throw new BadRequestError({ message: "Invalid user or password" });

    const isPasswordCorrect = await compare(password, user.password);

    if (!isPasswordCorrect)
      throw new BadRequestError({ message: "Invalid user or password" });

    const {
      accessTokenExpiration,
      accessTokenSecret,
      refreshTokenSecret,
      refreshTokenExpiration,
      issuer,
    } = authConfig;

    const accessToken = sign(
      { email: user.email, role: user.role },
      accessTokenSecret as string,
      {
        subject: user.id,
        issuer: issuer,
        expiresIn: accessTokenExpiration,
      }
    );

    const refreshToken = sign({}, refreshTokenSecret as string, {
      subject: user.id,
      issuer: issuer,
      expiresIn: refreshTokenExpiration,
    });

    return { accessToken, refreshToken };
  };
}
