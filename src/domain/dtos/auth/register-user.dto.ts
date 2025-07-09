import { Validators } from "@src/config/validators";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string,
  ) {}

  static create(object: Record<string, any>): [string?, RegisterUserDto?] {
    const { email, name, password } = object;
    if (!name) return ["Name is required"];
    if (!email) return ["Email is required"];
    if (!Validators.email.test(email)) return ["Email is invalid"];
    if (!password) return ["Password is required"];
    if (password.length < 6)
      return ["Password must be at least 6 characters long"];

    return [
      undefined,
      new RegisterUserDto(name, email.toLowerCase(), password),
    ];
  }
}
