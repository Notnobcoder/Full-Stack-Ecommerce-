
import { Product, Prisma } from "@prisma/client"


export interface IProductRepository {
  create(data: Prisma.ProductCreateInput): Promise<Product>
  find(limit?: number, offset?: number): Promise<Product[]>;
}
