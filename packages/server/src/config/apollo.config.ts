import { ApolloServer } from "apollo-server-express"
import { AuthMutation } from "../graphql/mutation/auth.mutation"
import { UserResolver } from "../graphql/mutation/user.mutation"
import { buildSchema } from "type-graphql"

export const apolloServerConfig = async (app: any) => {

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [AuthMutation, UserResolver],
      validate: false
    }),
    context: ({ req, res }) => ({ req, res }),
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
    app,
    cors: false
  })
}
