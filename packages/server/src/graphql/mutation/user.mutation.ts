import { PrismaClient } from "@prisma/client";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { DeleteInputT } from "../types/auth.types";
import { UserT } from "../types/user.types";
import { AuthMiddleware } from "../middleware/authMiddleware";

@Resolver()
export class UserResolver {
  private readonly _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  @Query(() => [UserT])
  @UseMiddleware(AuthMiddleware)
  public async getUsers() {
    try {
      const result = await this._prisma.user.findMany();
      return result;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users.");
    }
  }

  @Query(() => UserT)
  @UseMiddleware(AuthMiddleware)
  public async getSingleUser(
    @Arg("input") input: DeleteInputT
  ) {
    try {
      const { email } = input;
      const result = await this._prisma.user.findUnique({
        where: {
          email
        }
      })
      return result
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Unable to fetch users.");

    }

  }


  // mutations
  @Mutation(() => String)
  @UseMiddleware(AuthMiddleware)
  public async DeleteUser(
    @Arg("input") input: DeleteInputT
  ) {
    try {
      const { email } = input
      const user = await this._prisma.user.findUnique({
        where: {
          email
        }
      })
      if (!user) {
        return "No User Found"
      }
      await this._prisma.user.delete({
        where: {
          email
        }
      })
      return "user deleted successfully"
    } catch (error) {
      console.log(error)
      return "Error Occured"
    }
  }
}
