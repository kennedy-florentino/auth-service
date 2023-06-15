import { AppDataSource } from "../../data-source";
import { BadRequestError } from "../../helpers/api-errors";
import { userRepository } from "../../repositories/user";
import { SignUpService } from "../../services/sign-up";
import { createUserMock } from "../__mocks__/user.mock";

describe("SignUpService", () => {
  const user = createUserMock();
  jest.spyOn(AppDataSource, "initialize").mockImplementation();
  jest.spyOn(userRepository, "save").mockReturnValue(Promise.resolve(user));
  const spyFindOneBy = jest.spyOn(userRepository, "findOneBy");

  describe("Save method", () => {
    describe("Given SignUpRequest", () => {
      it("Should return UserEntity", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(null));
        await AppDataSource.initialize();
        expect(
          await SignUpService.save({
            email: user.email,
            name: user.name,
            password: user.password,
          })
        ).toBe(user);
      });
    });

    describe("Given SignUpRequest with existing email", () => {
      it("Should throw BadRequestError", async () => {
        spyFindOneBy.mockReturnValue(Promise.resolve(user));

        await expect(SignUpService.save(user)).rejects.toThrow(BadRequestError);
      });
    });
  });
});
