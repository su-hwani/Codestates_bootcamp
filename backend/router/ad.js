import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"

const ad_router = express.Router()

// input: ID, ouput: string
// 전체 AD 가져오기
ad_router.get("/all", async (req, res)=>{
  const ad = await AD.find() 
  res.status(200).json({
    status: 'success',
    statusText: 'OK'
  })
})

// ID 를 기준으로 특정 AD 가져오기
ad_router.post("/find", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: 'error',
        statusText: 'Can not find AD'
      })
    }
    res.status(200).json({
      status: 'success',
      statusText: 'OK',
      data: { result }
    })
  })
})

// input: 속성값 전체, output: string
// AD 를 추가하기
ad_router.post("/add", async (req, res) => {
  try {
    const existingAd = await AD.findOne({ ID: req.body.ID })
    if (existingAd) {
      return res.status(400).json({
        status: 'error',
        statusText: 'already Exist'
      })
    }
    if (!req.body.ID || !req.body.size || !req.body.start_exp || !req.body.end_exp || !req.body.reg || !req.body.Contract_ID || !req.body.Expense) {
      return res.status(400).json({
        status: 'error',
        statusText: 'missing attribute'
      })
    }
    const ad = new AD({
      ID: req.body.ID,
      size: req.body.size,
      title: req.body.title,
      text: req.body.text,
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
      status: "success",
      statusText: "AD 생성 성공",
      data: { result: ad }
    })
  } catch (error) {
    res.status(400).json({
      status: "error",
      statusText: "Internal Server Error"
    })
  }
})

// input: ID, output: string
// ID를 기준으로 특정 AD 정보 수정하기
ad_router.post("/modify", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: 'error',
        statusText: 'Can not find AD'
      })
    }
    result.updateOne(
      {ID: req.body.ID},
      {$set:{text_short: req.body.text_short, text_long: req.body.text_long, count: req.body.count}})
    res.status(200).json({
      status: 'success',
      statusText: 'OK'})
  })
})

// input: ID, output: string
// ID 를 기준으로 특정 AD 비활성화
ad_router.post("/delete", async (req, res)=>{
  await AD.findOneAndUpdate(
    {ID: req.body.ID},
    {$push: {activation: false}},
    {new: true}
  ).then(result=>{
    if(!result){
      return res.status(400).json({
        status: 'error',
        statusText: 'Can not find AD'
      })
    }
    res.status(200).json({
      status: 'success',
      statusText: 'OK'
    })
  })
})

// input: ID, output: AD object
// ID 를 기준으로 특정 AD 가져오기 -> Find 와 겹침, 리팩토링 필요
ad_router.get("/detail", async (req, res)=>{
  await AD.findOne({ID: req.body.ID}).then(result=>{
    if(!result){
      return res.status(400).json({
        status: 'error',
        statusText: 'Can not find AD'
      })
    }
    res.status(200).json({
      status: 'success',
      statusText: 'OK',
      data: {result}
    })
  })
})

   
export default ad_router