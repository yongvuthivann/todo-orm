import { Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../users/users.service";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { JwtService } from "@nestjs/jwt";
import { AuthCredentialDto } from "./dtos/auth-credential.dto";
import { JwtPayloadInterface } from "./dtos/jwt-payload.interface";
import * as bcrypt from 'bcrypt'
import { UserEntity } from "../users/models/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<void> {
    return await this.usersService.create(createUserDto)
  }

  async signin(authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}>{
    const { username, password } = authCredentialDto
    const user = await this.usersService.findUser(username)
    const isPassword = await bcrypt.compare(password, user.password)
    try {
      if (user && isPassword) {
        const payload: JwtPayloadInterface = { username }
        const accessToken = await this.jwtService.sign(payload)
        return { accessToken }
      } else {
        throw new UnauthorizedException("Invalid credential")
      }
    } catch(error) {
      throw new InternalServerErrorException()
    }
  }

  async updateUser(id: string, imgPath: string): Promise<UserEntity> {
    return await this.usersService.updateOne(id, imgPath)
  }
}
