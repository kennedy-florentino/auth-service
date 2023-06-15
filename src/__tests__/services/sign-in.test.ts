import "dotenv/config";
import { AppDataSource } from "../../data-source";
import { BadRequestError } from "../../helpers/api-errors";
import { userRepository } from "../../repositories/user";
import { SignInService } from "../../services/sign-in";
import { createUserMock } from "../__mocks__/user.mock";
import { createTokensMock } from "../__mocks__/tokens.mock";

describe("SignInService", () => {
  const user = createUserMock();
  const tokensMock = createTokensMock(user);
  jest.spyOn(AppDataSource, "initialize").mockImplementation();
  const spyFindOneBy = jest.spyOn(userRepository, "findOneBy");

  describe("SignIn method", () => {
    describe("Given valid SignInRequest", () => {
      it("Should return accessToken and refreshToken", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(user));
        await expect(
          SignInService.signIn({ email: user.email, password: "12345678" })
        ).resolves.toMatchObject(tokensMock);
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
