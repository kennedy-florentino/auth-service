import { randomUUID } from "crypto";
import express from "express";
import "express-async-errors";
import supertest from "supertest";
import { UserRole } from "../../entities/user";
import { errorMiddleware } from "../../middlewares/error";
import { SignInRequest } from "../../requests/sign-in";
import { SignUpRequest } from "../../requests/sign-up";
import routes from "../../routes";
import { SignInService } from "../../services/sign-in";
import { SignUpService } from "../../services/sign-up";

describe("AuthController", () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);

  jest.spyOn(SignUpService, "save").mockReturnValue(
    Promise.resolve({
      id: randomUUID(),
      role: UserRole.MEMBER,
      name: "Kennedy",
      email: "kennedyf2k@gmail.com",
      password: "12345678",
    })
  );

  jest
    .spyOn(SignInService, "signIn")
    .mockReturnValue(Promise.resolve({ accessToken: "", refreshToken: "" }));

  describe("SignUp route", () => {
    describe("Given valid sign-up properties", () => {
      it("Should return status code 201", async () => {
        await supertest(app)
          .post("/auth/sign-up")
          .send({
            name: "Kennedy",
            email: "kennedy@gmail.com",
            password: "12345678",
          } as SignUpRequest)
          .expect(201);
      });
    });

    describe("Given invalid sign-up properties", () => {
      it("Should return status code 400", async () => {
        await supertest(app).post("/auth/sign-up").send({}).expect(400);
      });
    });
  });

  describe("SignIn route", () => {
    describe("Given valid sign-in properties", () => {
      it("Should return status code 200", async () => {
        await supertest(app)
          .post("/auth/sign-in")
          .send({
            email: "kennedyf2k@gmail.com",
            password: "12345678",
          } as SignInRequest)
          .expect(200);
      });
    });

    describe("Given invalid sign-in properties", () => {
      let statusCode: number, body: unknown;

      (async () => {
        const signInResponse = await supertest(app)
          .post("/auth/sign-in")
          .send({});
        statusCode = signInResponse.statusCode;
        body = signInResponse.body;
      })();

      it("Should return status code 400", () => {
        expect(statusCode).toBe(400);
      });

      it('Should return message "Invalid user or password"', () => {
        expect(body).toEqual({ message: "Invalid user or password" });
      });
    });
  });
});
