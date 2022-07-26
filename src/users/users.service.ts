import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserEntity } from "./models/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "./dtos/create-user.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>) {}

  async create(createUserDto: CreateUserDto): Promise<void> {
    const { username, password } = createUserDto
    const salt = await bcrypt.genSalt()
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = this.userRepo.create({
      username,
      password: hashedPassword
    })

    try {
      await this.userRepo.save(user)
    } catch(error) {
      if (error.code === "23505") {
        throw new ConflictException("User already exist")
      }else {
        throw new InternalServerErrorException()
      }
    }
  }

  async findUser(username: string): Promise<UserEntity>{
    const user = await this.userRepo.findOne({
      where: { username }
    })
    return user
  }

  async findOne(id: string): Promise<UserEntity> {
    const userId = await this.userRepo.findOne({
      where: { id }
    })
    return userId
  }

  async findUsers(): Promise<UserEntity[]> {
    const user = await this.userRepo.find()
    return user
  }

  async updateOne(id: string, imgPath: string): Promise<UserEntity> {
    const updateUser = await this.findOne(id)
    updateUser.profileImg = imgPath
    return await this.userRepo.save(updateUser)
  }
  
}
