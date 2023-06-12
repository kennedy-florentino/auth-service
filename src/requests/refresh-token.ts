import { IsJWT } from "class-validator";

export class RefreshTokenRequest {
  @IsJWT()
  public accessToken: string;

  @IsJWT()
  public refreshToken: string;

  constructor({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }) {
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}
