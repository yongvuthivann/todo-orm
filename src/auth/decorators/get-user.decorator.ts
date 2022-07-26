import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { UserEntity } from "../../users/models/user.entity";

export const GetUserDecorator = createParamDecorator((_data, ctx:ExecutionContext): UserEntity => {
  const req = ctx.switchToHttp().getRequest()
  return req.user
})