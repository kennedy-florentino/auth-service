import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth";
import { UserEntity } from "../../entities/user";

interface TokensMock {
  accessToken: string;
  refreshToken: string;
}

export const createTokensMock = (user: UserEntity): TokensMock => {
  const accessToken = jwt.sign(
    { email: user.email, role: user.role },
    authConfig.accessTokenSecret as string,
    {
      subject: user.id,
      issuer: authConfig.issuer,
      expiresIn: authConfig.accessTokenExpiration,
    }
  );

  const refreshToken = jwt.sign({}, authConfig.refreshTokenSecret as string, {
    subject: user.id,
    issuer: authConfig.issuer,
    expiresIn: authConfig.refreshTokenExpiration,
  });

  return {
    accessToken,
    refreshToken,
  };
};
