import { Resolver, Mutation, Arg, Ctx } from "type-graphql";
import { AuthInputT, AuthT, AuthTInputS, AuthTS } from "../types/auth.types";
import { AuthSchema } from "../../utils/schemas/auth.schemas";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Response, Request } from "express";

export interface MyContext {
  req: Request & { session: { userId?: string } };
  res: Response;
}

declare module 'express-session' {
  interface SessionData {
    userId: number;
  }
}
@Resolver()
export class AuthMutation {
  private readonly _prisma: PrismaClient;

  constructor(prisma?: PrismaClient) {
    this._prisma = prisma || new PrismaClient();
  }

  // mutations

  @Mutation(() => AuthT)
  public async SignUp(
    @Arg("input") input: AuthInputT,
    @Ctx() ctx: MyContext
  ): Promise<AuthT | any> {
    try {
      const { username, email, password } = AuthSchema.parse(input);
      const hashedPassword = await bcrypt.hash(password, 10);
      const token = jwt.sign({ email, username }, process.env.JWT_SECRET!, { expiresIn: "7d" });

      const result = await this._prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      ctx.res.cookie("auth-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      return { ...result, token };
    } catch (error) {
      console.error("Error signing in:", error);
      throw new Error("Unable to sign in.");
    }
  }
  @Mutation(() => AuthTS)
  public async SignIn(
    @Arg("input") input: AuthTInputS,
    @Ctx() ctx: MyContext
  ): Promise<AuthTS | string> {
    const { email, password } = input;

    try {
      const user = await this._prisma.user.findUnique({
        where: { email },
      });

      if (!user) {
        return "User does not exist";
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        return "Password is incorrect";
      }

      const token = jwt.sign({ password }, process.env.JWT_SECRET!, { expiresIn: "7d" });
      ctx.res.cookie("auth-token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production" });
      return user; // or return { user, token } if you're adding JWT token
    } catch (error) {
      console.error("Error signing in:", error.message);
      throw new Error("Unable to sign in.");
    }
  }

  @Mutation(() => String)
  public async Logout(
    @Ctx() ctx: MyContext
  ) {
    ctx.res.clearCookie("auth-token")
    return "Logout Clear"
  }

}
