
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemon from 'nodemon'

const port = 8080
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

mongoose
  .connect(
    process.env.URL,{}
  )
  .then(() => console.log('MongoDB conected'))
  .catch((err) => {
    console.log(err);
  });
  
app.listen(port)
console.log(`server running at http ${port}\n`)

