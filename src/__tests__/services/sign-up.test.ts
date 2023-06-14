import { hashSync } from "bcrypt";
import { AppDataSource } from "../../data-source";
import { UserEntity, UserRole } from "../../entities/user";
import { BadRequestError } from "../../helpers/api-errors";
import { userRepository } from "../../repositories/user";
import { SignUpService } from "../../services/sign-up";

describe("SignUpService", () => {
  const user: UserEntity = {
    id: "416f3a6d-0910-43a6-925e-1f588d320e54",
    role: UserRole.MEMBER,
    name: "Kennedy",
    email: "kennedyf2k@gmail.com",
    password: hashSync("12345678", 8),
  };

  jest.spyOn(AppDataSource, "initialize").mockImplementation();
  jest.spyOn(userRepository, "save").mockReturnValue(Promise.resolve(user));
  jest
    .spyOn(userRepository, "findOneBy")
    .mockReturnValue(Promise.resolve(null));

  describe("Save method", () => {
    describe("Given SignUpRequest", () => {
      it("Should return UserEntity", async () => {
        await AppDataSource.initialize();
        expect(await SignUpService.save({ ...user })).toBe(user);
      });
    });

    describe("Given SignUpRequest with existing email", () => {
      it("Should throw BadRequestError", async () => {
        jest
          .spyOn(userRepository, "findOneBy")
          .mockReturnValue(Promise.resolve(user));

        await expect(SignUpService.save({ ...user })).rejects.toThrow(
          BadRequestError
        );
      });
    });
  });
});
