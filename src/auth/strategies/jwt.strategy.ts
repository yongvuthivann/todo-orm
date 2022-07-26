import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtPayloadInterface } from "../dtos/jwt-payload.interface";
import { UsersService } from "../../users/users.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
  constructor(
    private configService: ConfigService,
    private usersService: UsersService
  ) {
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    });
  }

  validate(payload: JwtPayloadInterface) {
    const { username } = payload
    const user = this.usersService.findUser(username)

    if (!user) {
      throw new UnauthorizedException("Invalid credential")
    }
    return user
  }
}