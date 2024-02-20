import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateUserDto): Promise<CreateUserDto> | null {
    const exist = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (exist) {
      throw new Error('User already exists');
    }

    return await this.prisma.user.create({
      data: {
        ...data,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new Error("User don't exists");
    }

    return user;
  }

  async update(id: number, data: UpdateUserDto) {
    const exist = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!exist) {
      throw new Error('User does not exists');
    }
    const updateUser = await this.prisma.user.update({
      where: { id },
      data: { ...data },
    });
    return data;
  }

  async remove(id: number) {
    const exist = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new Error('User does not exists');
    }
    await this.prisma.user.delete({
      where: { id },
    });
    return `User excluded with succesfully`;
  }
}
