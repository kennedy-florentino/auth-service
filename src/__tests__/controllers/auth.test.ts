import "dotenv/config";
import supertest from "supertest";
import express from "express";
import "express-async-errors";
import routes from "../../routes";
import { errorMiddleware } from "../../middlewares/error";
import { SignInRequest } from "../../requests/sign-in";
import { SignUpRequest } from "../../requests/sign-up";
import { RefreshTokenService } from "../../services/refresh-token";
import { SignInService } from "../../services/sign-in";
import { SignUpService } from "../../services/sign-up";
import { createUserMock } from "../__mocks__/user.mock";
import { createTokensMock } from "../__mocks__/tokens.mock";

describe("AuthController", () => {
  const app = express().use(express.json()).use(routes).use(errorMiddleware);
  const user = createUserMock();
  const tokensMock = createTokensMock(user);

  jest.spyOn(SignUpService, "save").mockReturnValue(Promise.resolve(user));

  jest
    .spyOn(SignInService, "signIn")
    .mockReturnValue(Promise.resolve(tokensMock));

  jest.spyOn(RefreshTokenService, "getTokens").mockReturnValue(tokensMock);

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
      it('Should return message "Invalid user or password" and status code 400', async () => {
        const { statusCode, body } = await supertest(app)
          .post("/auth/sign-in")
          .send({});
        expect(body).toStrictEqual({ message: "Invalid user or password" });
        expect(statusCode).toBe(400);
      });
    });
  });

  describe("RefreshToken route", () => {
    describe("Given valid JWT", () => {
      it("Should return access and refresh token and status code 200", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/auth/refresh-token")
          .send(tokensMock);
        expect(body).toStrictEqual(tokensMock);
        expect(statusCode).toBe(200);
      });
    });

    describe("Given invalid JWT", () => {
      it("Should return invalid token message and status code 400", async () => {
        const { statusCode, body } = await supertest(app)
          .post("/auth/refresh-token")
          .send({});

        expect(body).toStrictEqual({
          message: "Invalid token",
          metadata: [
            {
              constraints: { isJwt: "accessToken must be a jwt string" },
              property: "accessToken",
            },
            {
              constraints: { isJwt: "refreshToken must be a jwt string" },
              property: "refreshToken",
            },
          ],
        });

        expect(statusCode).toBe(400);
      });
    });
  });
});
