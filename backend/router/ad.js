import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"

const ad_router = express.Router()

// input: ID, ouput: string
ad_router.get("/all", async (req, res)=>{
  const ad = await AD.find() 
  res.json(ad)
  console.log("정상작동")
})

// input: 속성값 전체, output: string
ad_router.post("/add", async (req, res)=>{
  const ad = new AD({
    // 추가할 내용들 - 스키마 보고 추후 수정
    ID: req.body.ID,
    size: req.body.size,
    title: req.body.title,
    image: req.body.image,
    URL: req.body.URL,
    count: req.body.count,
    format: req.body.format,
    byte: req.body.byte,
    start_exp: req.body.start_exp,
    end_exp: req.body.end_exp,
    reg: req.body.reg, 
    Contract_ID: req.body.Contract_ID,
    Expense: req.body.Expense
  })
  await ad.save()
  res.json("AD 등록 성공")
})

// input: ID, output: string
ad_router.post("/modify", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      res.json("error")
    }
    result.updateOne({ID: req.body.ID}, {$set: {text_short: req.body.text_short, text_long: req.body.text_long}})
    res.json("AD 수정 성공")
  })
})

// input: ID, output: string
ad_router.post("/delete", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      res.json("error")
    }
    result.deleteOne({ID: req.body.ID})
    res.json("AD 삭제 성공")
  })
})

// input: ID, output: object
ad_router.get("/detail", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      res.json("error")
    }
    res.json(result) // 이게 되는지 모르겠다. 
  })
})

   
export default ad_router