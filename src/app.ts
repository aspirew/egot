import * as dotenv from "dotenv";
dotenv.config()


import express from 'express'
import wayService from './services/wayService' 

const app = express()
const port = 3000

console.log(process.env.DB_SERVER)

app.get('/', (req, res) => {
  res.send('Hello world!');
})

app.get('/api/ways', async (req, res) => {
  const result = await wayService.getAllUsers()
  console.log(result[0])
  res.json(result[0])
})

app.listen(port, () => {
  return console.log(`server is listening on ${port}`);
})