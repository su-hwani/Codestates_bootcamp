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

ad_router.get("/find", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: 'error',
        error: 'Can not find AD with using ID'
      })
    }
    res.status(200).json({
      status: success,
      data: result
    })
  })
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
  res.status(200).json({
    status: success,
    data: 'AD 추가 성공'
  })
})

// input: ID, output: string
ad_router.post("/modify", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: error,
        data: "Can not find AD with using ID"
      })
    }
    result.updateOne({ID: req.body.ID}, {$set: {text_short: req.body.text_short, text_long: req.body.text_long}})
    res.status(200).json({
      status: "success",
      data: "AD 수정 성공"})
  })
})

// input: ID, output: string
ad_router.post("/delete", async (req, res)=>{
  await AD.findOneAndUpdate(
    {ID: req.body.ID},
    {$push: {activation: false}},
    {new: true}
  ).then(result=>{
    if(!result){
      return res.status(400).json({
        status: "error",
        data: "Can not find AD with using ID"
      })
    }
    res.status(200).json({
      status: "success",
      data: "AD 삭제 성공"
    })
  })
})

// input: ID, output: AD object
ad_router.get("/detail", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: "error",
        data: "Can not find AD with using ID"
      })
    }
    res.status(200).json({
      status: "success",
      data: result
    })
  })
})

   
export default ad_router