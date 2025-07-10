import type { AuthDataSource } from "@src/domain/data/auth.datasource";
import type { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import { UserEntity } from "@src/domain/entities/user.entity";
import { CustomError } from "@src/domain/errors/custom.error";

export class AuthDataSourceImpl implements AuthDataSource {
  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;
    try {
      return new UserEntity("1", name, email, password, ["Admin Role"]);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.InternalServerError("Failed to register user");
      }
    }
  }
}
