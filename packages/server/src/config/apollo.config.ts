import { ApolloServer } from "apollo-server-express"
import { buildSchema } from "type-graphql"
// import { ProductCrudResolver } from "@prisma/@generators/type-graphql"
import { ProductResolver } from "../graphql/resolvers/product.resolver"

export const apolloServerConfig = async (app: any) => {

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [ProductResolver],
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
