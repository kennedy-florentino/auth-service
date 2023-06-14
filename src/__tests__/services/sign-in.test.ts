import { hashSync } from "bcrypt";
import "dotenv/config";
import jwt from "jsonwebtoken";
import { authConfig } from "../../config/auth";
import { AppDataSource } from "../../data-source";
import { UserEntity, UserRole } from "../../entities/user";
import { BadRequestError } from "../../helpers/api-errors";
import { userRepository } from "../../repositories/user";
import { SignInService } from "../../services/sign-in";

describe("SignInService", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

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

  jest.spyOn(AppDataSource, "initialize").mockImplementation();
  const spyFindOneBy = jest.spyOn(userRepository, "findOneBy");

  describe("SignIn method", () => {
    describe("Given valid SignInRequest", () => {
      it("Should return accessToken and refreshToken", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(user));
        await expect(
          SignInService.signIn({
            email: user.email,
            password: "12345678",
          })
        ).resolves.toMatchObject(mockTokens);
      });
    });

    describe("Given non-existent user", () => {
      it("Should throw BadRequestError", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(null));
        await expect(
          SignInService.signIn({ email: user.email, password: "12345678" })
        ).rejects.toThrow(BadRequestError);
      });
    });

    describe("Given user with incorrect password", () => {
      it("Should throw BadRequestError", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(user));
        await expect(
          SignInService.signIn({ email: user.email, password: "87654321" })
        ).rejects.toThrow(BadRequestError);
      });
    });
  });
});
