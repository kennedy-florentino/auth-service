import { UserRole } from "../entities/user";

export class SignUpResponse {
  public id: string;
  public name: string;
  public email: string;
  constructor({
    id,
    name,
    email,
  }: {
    id: string;
    role: UserRole;
    name: string;
    email: string;
  }) {
    this.id = id;
    this.name = name;
    this.email = email;
  }
}
