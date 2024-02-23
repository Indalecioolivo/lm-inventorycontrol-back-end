import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProductDto): Promise<CreateProductDto> {
    function verifyProduct(data: CreateProductDto) {
      const regexNumbers = /^\d+$/;

      if (data.bar_code.length != 13 || !regexNumbers.test(data.bar_code)) {
        throw new Error('Código de Barras Inválido');
      }

      if (data.name.length === 0) {
        throw new Error('Insira o nome do Produto.');
      }
    }

    verifyProduct(data);

    const exist = await this.prisma.product.findUnique({
      where: {
        bar_code: data.bar_code,
      },
    });
    if (exist) {
      throw new Error('Produto já cadastrado');
    }

    return await this.prisma.product.create({
      data: { ...data },
    });
  }

  async findAll() {
    return await this.prisma.product.findMany();
  }

  async findOne(barcode: string): Promise<CreateProductDto> | null {
    const exist = await this.prisma.product.findUnique({
      where: { bar_code: barcode },
    });

    if (!exist) {
      throw new Error('This Product does not exist');
    }

    return exist;
  }

  async update(
    id: number,
    data: UpdateProductDto,
  ): Promise<UpdateProductDto> | null {
    const exist = await this.prisma.product.findUnique({
      where: { id },
    });
    if (!exist) {
      throw new Error('This Product does not exist');
    }
    if (
      !data.bar_code &&
      !data.description &&
      !data.name &&
      !data.stock &&
      !data.volume
    ) {
      throw new Error('Enter at least one field to edit');
    }
    return await this.prisma.product.update({
      where: { id },
      data: { ...data },
    });
  }

  async remove(id: number) {
    const exist = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!exist) {
      throw new Error('Product does not exist');
    }

    await this.prisma.product.delete({
      where: { id },
    });
    return 'Product excluded with sucess';
  }
}
