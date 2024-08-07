import { PrismaClient, Product } from "@prisma/client";
import { IProductRepository } from "../interface/productRepository.interface";
import { ProductInputT } from "../graphql/types/main.types";

export class ProductRepository implements IProductRepository {
  private readonly _prisma: PrismaClient

  constructor() {
    this._prisma = new PrismaClient()
  }

  public async create(data: ProductInputT): Promise<Product> {
    return await this._prisma.product.create({
      data: data
    })
  }

  public async find(): Promise<Product[]> {
    return await this._prisma.product.findMany()
  }
}
