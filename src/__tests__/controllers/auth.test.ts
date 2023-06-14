import { randomUUID } from "crypto";
import express from "express";
import "express-async-errors";
import jwt from "jsonwebtoken";
import supertest from "supertest";
import { authConfig } from "../../config/auth";
import { UserRole } from "../../entities/user";
import { errorMiddleware } from "../../middlewares/error";
import { SignInRequest } from "../../requests/sign-in";
import { SignUpRequest } from "../../requests/sign-up";
import routes from "../../routes";
import { RefreshTokenService } from "../../services/refresh-token";
import { SignInService } from "../../services/sign-in";
import { SignUpService } from "../../services/sign-up";

describe("AuthController", () => {
  const app = express();
  app.use(express.json());
  app.use(routes);
  app.use(errorMiddleware);

  const mockTokens = {
    accessToken: jwt.sign(
      { email: "kennedyf2k@gmail.com", role: UserRole.MEMBER },
      "secret",
      {
        subject: randomUUID(),
        issuer: authConfig.issuer,
        expiresIn: authConfig.accessTokenExpiration,
      }
    ),
    refreshToken: jwt.sign({}, "secret", {
      subject: randomUUID(),
      issuer: authConfig.issuer,
      expiresIn: authConfig.refreshTokenExpiration,
    }),
  };

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
    .mockReturnValue(Promise.resolve(mockTokens));

  jest.spyOn(RefreshTokenService, "getTokens").mockReturnValue(mockTokens);

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
          .send(mockTokens);
        expect(body).toStrictEqual(mockTokens);
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
