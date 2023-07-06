import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import nodemon from 'nodemon'

import { find_AD, find_COUNTER, chkActivation } from "./find.js"
import { json_format } from "./json_format.js"

import { AD } from "../models/AD.js"
import { COUNTER_test } from "../models/COUNTER_test.js"

const ad_router = express.Router()

// input: ID, ouput: string
// 전체 AD 가져오기
ad_router.get("/all", async (req, res)=>{
  const ad = await AD.find({activation:true}) 
  res.status(200).json(
    json_format(200, ad)
  )
})

// ID 를 기준으로 특정 AD 가져오기
ad_router.post("/find", async (req, res)=>{
  const result = await find_AD(req.body.ID)
  if(!result){
    return res.status(404).json(
      json_format(404)
    )
  }else if(!chkActivation(result)){
    return res.status(403).json(
      json_format(403)
    )
  }else{
    return res.status(200).json(
      json_format(200)
    )
  }
})


ad_router.get("/counter", async (req, res) => {
  const counter = await find_COUNTER()
  return res.status(200).json(
    json_format(200, counter )
  )
})


// input: 속성값 전체, output: string
// AD 를 추가하기
ad_router.post("/add", async (req, res) => {
  try {
        // const existingAd = await find_AD(req.body.ID)
        // if (existingAd) {
        //   return res.status(400).json(
        //   json_format(400)
        //   )
        // }

    // if (!req.body.ID || !req.body.size || !req.body.start_exp || !req.body.end_exp || !req.body.reg || !req.body.Contract_ID || !req.body.Expense) {
    //   return res.status(400).json(
    //   json_format(400)
    //   )
    // }

    await axios.get('http://localhost:8080/ad/counter',{
    }).then(async (result)=> {
      const ad = new AD({
        ID: result.data.data.count,
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
        Expense: req.body.Expense,
        activation: req.body.activation,
      })
      await ad.save()
      return res.status(200).json(
        json_format(200, ad )
      )
    })
  } catch (error) {
    console.log(error)
    res.status(400).json(
      json_format(400)
    )
  }
})

// input: ID, output: string
// ID를 기준으로 특정 AD 정보 수정하기
ad_router.post("/modify", async (req, res)=>{
  await find_AD(req.body.ID).then(result=>{
    if(!result){
      return res.status(404).json(
        json_format(404)
      )
    }
    result.updateOne(
      {ID: req.body.ID},
      {$set:{text_short: req.body.text_short, text_long: req.body.text_long, count: req.body.count}})
    res.status(200).json(
      json_format(200)
    )
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
      return res.status(404).json(
        json_format(404)
      )
    }
    res.status(200).json(
      json_format(200)
    )
  })
})

// input: ID, output: AD object
// ID 를 기준으로 특정 AD 가져오기 -> Find 와 겹침, 리팩토링 필요
ad_router.get("/detail", async (req, res)=>{
  await find_AD(req.body.ID).then(result=>{
    if(!result){
      return res.status(404).json(
        json_format(404)
      )
    }
    res.status(200).json(
      json_format(200, {result})
    )
  })
})

   
export default ad_router