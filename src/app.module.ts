import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './database/prisma.service';

@Module({
  imports: [UsersModule],
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
})
export class AppModule {}
