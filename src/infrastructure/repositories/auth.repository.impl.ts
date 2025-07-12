import type { AuthDataSource } from "@src/domain/datasource/auth.datasource";
import type { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import type { UserEntity } from "@src/domain/entities/user.entity";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";

export class AuthRepositoryImpl implements AuthRepository {
  constructor(private readonly authDataSource: AuthDataSource) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDataSource.register(registerUserDto);
  }
}
