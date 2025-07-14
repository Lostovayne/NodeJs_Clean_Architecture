import { UserEntity } from "@src/domain/entities/user.entity";
import { CustomError } from "@src/domain/errors/custom.error";

export class UserMapper {
  static userEntityFromObject(object: Record<string, any>): UserEntity {
    const { id, _id, name, email, password, roles } = object;
    if (!id || !_id) throw CustomError.BadRequest("Missing Id or _id in user object");
    if (!name) throw CustomError.BadRequest("Missing name in user object");
    if (!email) throw CustomError.BadRequest("Missing email in user object");
    if (!password) throw CustomError.BadRequest("Missing password in user object");

    return new UserEntity(id || _id.toString(), name, email, password, roles || ["USER_ROLE"]);
  }
}
