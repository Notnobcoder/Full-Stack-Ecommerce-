import session from "express-session"

export const expressSession = session({
  // store: new RedisStore({ client: redisClient }),
  name: "qid",
  secret: 'your-secret-key', // Replace with your own secret
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
  }
})
