import { JwtAdapter, type Duration } from "@src/config/jwt";
import type { RegisterUserDto } from "@src/domain/dtos/auth/register-user.dto";
import { CustomError } from "@src/domain/errors/custom.error";
import type { AuthRepository } from "@src/domain/repositories/auth.repository";

interface UserToken {
  token: string;
  user: Record<"id" | "name" | "email", string>;
}

interface RegisterUserUseCase {
  execute(registerUserDto: RegisterUserDto): Promise<UserToken>;
}

type SignToken = (payload: Object, duration?: Duration) => Promise<string | null>;

export class RegisterUserUseCaseImpl implements RegisterUserUseCase {
  constructor(
    // Inject dependencies like user repository
    private readonly authRepository: AuthRepository,
    private readonly signToken: SignToken = JwtAdapter.generateToken
  ) {}

  async execute(registerUserDto: RegisterUserDto): Promise<UserToken> {
    const user = await this.authRepository.register(registerUserDto);
    const token = await this.signToken({ id: user.id });

    if (!token) throw CustomError.Conflict("Failed to generate token");

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
