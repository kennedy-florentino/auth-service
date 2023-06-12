import { IsEmail, MaxLength, MinLength } from "class-validator";

export class CreateUserRequest {
  @MinLength(3)
  @MaxLength(100)
  public name: string;

  @IsEmail()
  public email: string;

  @MinLength(8)
  public password: string;

  constructor({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    this.name = name;
    this.email = email;
    this.password = password;
  }
}
