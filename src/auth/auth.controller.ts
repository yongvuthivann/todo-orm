import { Body, Controller, Get, Param, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { CreateUserDto } from "../users/dtos/create-user.dto";
import { AuthCredentialDto } from "./dtos/auth-credential.dto";
import { UserEntity } from "../users/models/user.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { editFileName } from "src/todos/utils/file-upload.util";
import { AuthGuard } from "@nestjs/passport";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
    return this.authService.signup(createUserDto)
  }

  @Post('signin')
  signIn(@Body() authCredentialDto: AuthCredentialDto): Promise<{accessToken: string}> {
    return this.authService.signin(authCredentialDto)
  }

  @UseGuards(AuthGuard())
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/profileimages',
      filename: editFileName
    })
  }))
  async uploadFile(@UploadedFile() file, id:string): Promise<UserEntity>{
    console.log(file)
    return await this.authService.updateUser(id, file.filename)
    // return {
    //   originalname: file.originalname,
    //   filename: file.filename
    // }
  }
}
