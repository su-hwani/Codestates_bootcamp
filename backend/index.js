
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

<<<<<<< Updated upstream
=======
app.get("/ad_create", async (req, res)=> {
  const ad = new AD({
    ID:"yammy",
    NUM: 2,
  })
  await ad.save()
  res.json("성공")
})

app.get("/ad", async (req, res)=>{
  const ad = await AD.find() 
  res.json(ad)
  console.log("정상작동")
})

app.get("/ad_identifier", async (req, res)=>{
  const identifier = req.body
  const ad = await AD.findOne(identifier).then(result=>{
    res.json(result)
  })
})
>>>>>>> Stashed changes
