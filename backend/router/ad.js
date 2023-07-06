import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import nodemon from 'nodemon'


import { find_AD, find_COUNTER } from "./find.js"
import { AD } from "../models/AD.js"
import { COUNTER_test } from "../models/COUNTER_test.js"


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
  await find_AD(req.body.ID).then(result=>{
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

ad_router.get("/counter", async (req, res) => {
  const counter = await find_COUNTER()
  return res.status(200).json({
    status: 'success',
    statusText: 'OK',
    data: { counter}

  })
})


// input: 속성값 전체, output: string
// AD 를 추가하기
ad_router.post("/add", async (req, res) => {
  try {
    await axios.get('http://localhost:8080/ad/counter',{
    }).then(async (result)=> {
      const ad = new AD({
        ID: result.data.data.counter.count,
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
      return res.status(200).json({
        status: "success",
        statusText: "AD 생성 성공",
        data: { ad }
      })
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
  await find_AD(req.body.ID).then(result=>{
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
  await find_AD(req.body.ID).then(result=>{
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