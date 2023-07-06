import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"

const test_router = express.Router()

// input: ID, output: object
// 특정 ID 를 기준으로 AD 가져오기 -> Find 와 겹침, 리팩토링 필요
test_router.get("/send", async (req, res)=>{
    await AD.findOne({ID: req.body.ID}).then(result=>{
        if(!result){
            return res.status(400).json({
                status: 'error',
                statusText: 'Can not find AD'
            })
        }
        res.status(200).json(result)
    })
})

// input: ID, output: URL
// 특정 ID 를 기준으로 AD URL 가져오기
test_router.get("/webview", async (req, res)=>{
    await AD.findOne({ID: req.body.ID}).then(result=>{
        if(!result){
            return res.status(400).json({
                status: 'error',
                statusText: 'Can not find AD'
            })
        }
        res.status(200).json(result.URL)
    })
})

export default test_router