import compression from "compression"
import cookieParser from "cookie-parser"
import dotenv from "dotenv"
import express from "express"
import http from "node:http"
import "reflect-metadata"
import { apolloServerConfig } from "./config/apollo.config"
import { corsConfig } from "./config/cors.config"
import { rateLimiter } from "./config/rateLimit.config"
import { redis } from "./config/redis.config"
import { expressSession } from "./config/session.config"
import { socketConnection } from "./config/socket.config"
dotenv.config()
import { PORT } from "./utils/constansts.utils"




const main = async () => {
  if (process.env.NODE_ENV === "test") {
    await redis.flushall()
  }

  const app = express() as any

  app.use(cookieParser())
  app.use(expressSession)
  app.use(express.json())
  app.use(compression())
  app.use(rateLimiter)
  app.use(corsConfig)

  const httpServer = http.createServer(app)
  socketConnection(httpServer)

  apolloServerConfig(app)

  httpServer.listen(PORT, () => {
    console.log(`Server running at port ${PORT}`)
  })

}

main()
