import type { RegisterUserDto } from "../dtos/auth/register-user.dto";
import type { UserEntity } from "../entities/user.entity";

export abstract class AuthRepository {
  //todo:
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
