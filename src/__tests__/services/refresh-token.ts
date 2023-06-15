import "dotenv/config";
import { hashSync } from "bcrypt";
import { RefreshTokenService } from "../../services/refresh-token";
import jwt from "jsonwebtoken";
import { UserEntity, UserRole } from "../../entities/user";
import { authConfig } from "../../config/auth";
import { BadRequestError } from "../../helpers/api-errors";

describe("RefreshTokenService", () => {
  const user: UserEntity = {
    id: "416f3a6d-0910-43a6-925e-1f588d320e54",
    role: UserRole.MEMBER,
    name: "Kennedy",
    email: "kennedyf2k@gmail.com",
    password: hashSync("12345678", 8),
  };

  const mockTokens = {
    accessToken: jwt.sign(
      { email: "kennedyf2k@gmail.com", role: UserRole.MEMBER },
      authConfig.accessTokenSecret as string,
      {
        subject: user.id,
        issuer: authConfig.issuer,
        expiresIn: authConfig.accessTokenExpiration,
      }
    ),
    refreshToken: jwt.sign({}, authConfig.refreshTokenSecret as string, {
      subject: user.id,
      issuer: authConfig.issuer,
      expiresIn: authConfig.refreshTokenExpiration,
    }),
  };

  describe("GetTokens method", () => {
    describe("Given valid RefreshTokenRequest", () => {
      it("Should return new accessToken and refreshToken", () => {
        expect(RefreshTokenService.getTokens(mockTokens)).toMatchObject(
          mockTokens
        );
      });
    });

    describe("Given invalid RefreshTokenRequest", () => {
      it("Should return BadRequestError", () => {
        expect(() => {
          RefreshTokenService.getTokens({ accessToken: "", refreshToken: "" });
        }).toThrow(BadRequestError);
      });
    });
  });
});
