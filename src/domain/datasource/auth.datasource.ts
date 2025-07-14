import type { LoginUserDto } from "../dtos/auth/login-user.dto";
import type { RegisterUserDto } from "../dtos/auth/register-user.dto";
import type { UserEntity } from "../entities/user.entity";

export abstract class AuthDataSource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
