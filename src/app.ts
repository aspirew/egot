import bodyParser from "body-parser";
import * as dotenv from "dotenv";
dotenv.config()

import express from 'express'
import session from 'express-session';

import routes from './routes'

const app = express()

const port = 3000

app.use(bodyParser.json())

app.use(session({
  secret: process.env.session_secret,
  saveUnitialized: false,
  resave: false,
  cookie: {
      maxAge: 1000 * 60 * 30
  }
}))

app.use('/', routes)

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
})

export default app