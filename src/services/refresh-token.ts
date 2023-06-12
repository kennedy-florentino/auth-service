import { decode, sign, verify } from "jsonwebtoken";
import { authConfig } from "../config/auth";
import { UserRole } from "../entities/user";
import { BadRequestError } from "../helpers/api-errors";

interface AccessTokenPayload {
  sub: string;
  role: UserRole;
  email: string;
  iss: string;
}

interface RefreshTokenPayload {
  sub: string;
  iss: string;
}

export class RefreshTokenService {
  public static getTokens = ({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) => {
    try {
      const {
        accessTokenSecret,
        refreshTokenSecret,
        accessTokenExpiration,
        refreshTokenExpiration,
        issuer,
      } = authConfig;

      const accessTokenPayload = decode(accessToken) as AccessTokenPayload;

      const refreshTokenPayload = verify(
        refreshToken,
        refreshTokenSecret as string
      ) as RefreshTokenPayload;

      const newAccessToken = sign(
        {
          email: accessTokenPayload.email,
          role: accessTokenPayload.role,
        },
        accessTokenSecret as string,
        {
          subject: accessTokenPayload.sub,
          issuer: issuer,
          expiresIn: accessTokenExpiration,
        }
      );

      const newRefreshToken = sign({}, refreshTokenSecret as string, {
        subject: refreshTokenPayload.sub,
        issuer: issuer,
        expiresIn: refreshTokenExpiration,
      });

      return { newAccessToken, newRefreshToken };
    } catch (error) {
      throw new BadRequestError({ message: "Invalid token" });
    }
  };
}
