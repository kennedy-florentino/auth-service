import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum UserRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

@Entity({ name: "User" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text" })
  role: UserRole;

  @Column({ type: "text" })
  name: string;

  @Column({ type: "text", unique: true })
  email: string;

  @Column({ type: "text" })
  password: string;
}
