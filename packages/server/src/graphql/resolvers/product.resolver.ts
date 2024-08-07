import { Arg, Resolver, Mutation, Query } from "type-graphql";
import { ProductRepository } from "../../repository/product.repository";
import { ProductInputT, ProductT } from "../types/main.types";
// import { ProductInputT } from "../types/main.types";


@Resolver()
export class ProductResolver {
  private readonly _repository: ProductRepository

  constructor() {
    this._repository = new ProductRepository()
  }
  @Query(() => [ProductT])
  public async findProduct(): Promise<ProductT[]> {
    try {
      const products = await this._repository.find();
      console.log(products);
      return products
      // return "Product";
    } catch (error) {
      console.error(error); // Log the error for debugging
      return []; // Return an empty array in case of error
    }
  }



  @Mutation(() => String)
  public async addProduct(
    @Arg("body") body: ProductInputT
  ): Promise<string> { // Use lowercase 'string'
    try {
      console.log("working")
      const product = await this._repository.create(body);
      console.log(product)
      return "Product"

    } catch (error) {
      return "Error";
    }
  }
}
