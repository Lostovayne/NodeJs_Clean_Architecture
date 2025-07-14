import { Validators } from "@src/config/validators";

export class LoginUserDto {
  private constructor(
    public email: string,
    public password: string
  ) {}

  static create(object: Record<"email" | "password", string>): [string?, LoginUserDto?] {
    const { email, password } = object;
    if (!email) return ["Email is required"];
    if (!Validators.email.test(email)) return ["Email is invalid"];
    if (!password) return ["Password is required"];
    return [undefined, new LoginUserDto(email.toLowerCase(), password)];
  }
}
