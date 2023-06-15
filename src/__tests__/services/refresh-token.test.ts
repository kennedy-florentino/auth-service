import "dotenv/config";
import { BadRequestError } from "../../helpers/api-errors";
import { RefreshTokenService } from "../../services/refresh-token";
import { createUserMock } from "../__mocks__/user.mock";
import { createTokensMock } from "../__mocks__/tokens.mock";

describe("RefreshTokenService", () => {
  const user = createUserMock();
  const tokensMock = createTokensMock(user);

  describe("GetTokens method", () => {
    describe("Given valid RefreshTokenRequest", () => {
      it("Should return new accessToken and refreshToken", () => {
        expect(RefreshTokenService.getTokens(tokensMock)).toMatchObject(
          tokensMock
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
