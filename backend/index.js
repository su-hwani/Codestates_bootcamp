
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { AD } from "./models/AD.js"

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

app.get("/", async (req, res)=>{
  const ad = new AD({
    ID:"dummy",
  })
  await ad.save()
  console.log("성공")
  res.send(ad)
})

app.get("/ad", async (req, res)=>{
  const ad = await AD.findOne({ID:"yummy"}).then((result)=>{
    res.send(result)
  })
})

