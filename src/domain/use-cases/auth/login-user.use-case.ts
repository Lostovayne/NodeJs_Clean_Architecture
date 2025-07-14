import { JwtAdapter, type Duration } from "@src/config/jwt";
import type { LoginUserDto } from "@src/domain/dtos/auth/login-user.dto";
import { CustomError } from "@src/domain/errors/custom.error";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";

interface UserToken {
  token: string;
  user: Record<"id" | "name" | "email", string>;
}

interface LoginUserUseCase {
  execute(loginUserDto: LoginUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: Duration) => Promise<string | null>;

export class LoginUserUseCaseImpl implements LoginUserUseCase {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(loginUserDto: LoginUserDto): Promise<UserToken> {
    const user = await this.authRepository.login(loginUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.InternalServerError("Failed to generate token");

    return {
      token: token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }
}
