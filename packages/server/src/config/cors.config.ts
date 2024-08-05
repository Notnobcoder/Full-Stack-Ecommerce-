import cors from "cors"
export const corsConfig = cors({
  origin: process.env.NODE_ENV != "production" ? "*" : process.env.FRONT_END_URL,
  credentials: true
})
