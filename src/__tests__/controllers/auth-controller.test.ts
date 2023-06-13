import supertest from "supertest";
import { initializeServer } from "../..";

import { randomUUID } from "crypto";
import "express-async-errors";
import { UserRole } from "../../entities/user";
import { SignUpService } from "../../services/sign-up";

const app = initializeServer();

describe("AuthController", () => {
  test("Status should be 400", async () => {
    const response = await supertest(app).post("/auth/sign-up").send({});
    expect(response.statusCode).toBe(400);
  });

  test("Status should be 200", async () => {
    jest.spyOn(SignUpService, "save").mockReturnValue(
      Promise.resolve({
        id: randomUUID(),
        role: UserRole.MEMBER,
        name: "Kennedy",
        email: "kennedyf2k@gmail.com",
        password: "12345678",
      })
    );

    await supertest(app)
      .post("/auth/sign-up")
      .send({
        name: "Kennedy",
        email: "kennedy@gmail.com",
        password: "12345678",
      })
      .expect(201);
  });
});
