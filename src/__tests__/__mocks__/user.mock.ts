import { hashSync } from "bcrypt";
import { UserEntity, UserRole } from "../../entities/user";
import { randomUUID } from "crypto";

type UserMockConfig = {
  hashPassword?: boolean;
  role?: UserRole;
};

export const createUserMock = (config?: UserMockConfig): UserEntity => {
  return {
    id: randomUUID(),
    role: config?.role ?? UserRole.MEMBER,
    name: "Kennedy",
    email: "kennedyf2k@gmail.com",
    password:
      config?.hashPassword ?? true ? hashSync("12345678", 8) : "12345678",
  };
};
