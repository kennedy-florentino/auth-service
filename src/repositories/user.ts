import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/user";

export const userRepository = AppDataSource.getRepository(UserEntity);
