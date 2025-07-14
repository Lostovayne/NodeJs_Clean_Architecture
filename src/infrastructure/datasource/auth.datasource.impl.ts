import { BcryptAdapter } from "@src/config/bcrypt";
import { UserModel } from "@src/data/mongodb/models/user.mode";
import type { AuthDataSource } from "@src/domain/datasource/auth.datasource";
import type { LoginUserDto } from "@src/domain/dtos/auth/login-user.dto";
import type { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import { UserEntity } from "@src/domain/entities/user.entity";
import { CustomError } from "@src/domain/errors/custom.error";
import { UserMapper } from "../mappers/user.mapper";

type HashFunction = (password: string) => string;
type CompareFunction = (password: string, hash: string) => boolean;

export class AuthDataSourceImpl implements AuthDataSource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: CompareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const exists = await UserModel.findOne({ email });
      if (exists) throw CustomError.Conflict("User already exists");

      const hashedPassword = this.hashPassword(password);
      if (!hashedPassword) throw CustomError.InternalServerError("Failed to hash password");

      const user = new UserModel({
        name: name,
        email: email,
        password: hashedPassword,
      });
      await user.save();
      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.InternalServerError("Failed to register user");
      }
    }
  }

  async login(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const { email, password } = loginUserDto;

    try {
      const user = await UserModel.findOne({ email }).select("+password");
      if (!user) throw CustomError.NotFound("User not found");

      const isValidPassword = this.comparePassword(password, user.password);
      console.log("isValidPassword", isValidPassword);
      if (!isValidPassword) throw CustomError.Unauthorized("Invalid password");

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      } else {
        throw CustomError.InternalServerError("Failed to login user");
      }
    }
  }
}
