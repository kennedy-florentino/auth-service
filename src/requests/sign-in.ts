import { IsEmail, MinLength } from "class-validator";

export class SignInRequest {
  @IsEmail()
  public email: string;

  @MinLength(8)
  public password: string;

  constructor({ email, password }: { email: string; password: string }) {
    this.email = email;
    this.password = password;
  }
}
