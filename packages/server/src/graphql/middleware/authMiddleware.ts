
import { MiddlewareFn } from 'type-graphql';
import { MyContext } from '../mutation/auth.mutation';

// export const AuthMiddleware: MiddlewareFn<MyContext> = async ({ context }, next) => {
//   // const sessionToken = context.req.cookies["auth-token"]
//   //
//   // if (!sessionToken) {
//   //   context.res.status(403)
//   //   throw new Error('Not authenticated');
//   // }
//   return next();
// };

export const AuthMiddleware: MiddlewareFn<MyContext> = async ({ }, next) => {
  console.log("middleware working")
  return next();
};
