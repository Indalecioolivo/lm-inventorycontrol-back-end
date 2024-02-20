import { Module } from '@nestjs/common';

import { UsersModule } from './users/users.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { PrismaService } from './database/prisma.service';
import { ProductsModule } from './products/products.module';
import { ProductsService } from './products/products.service';

@Module({
  imports: [UsersModule, ProductsModule, ProductsModule],
  controllers: [UsersController],
  providers: [PrismaService, UsersService, ProductsService],
})
export class AppModule {}
