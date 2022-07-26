import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4, { message: "Password required at least 4 character"})
  @MaxLength(32)
  username: string;

  @IsString()
  @MinLength(8, { message: "Password required at least 8 character"})
  @MaxLength(32)
  password: string;
}