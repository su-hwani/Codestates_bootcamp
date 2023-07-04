import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"

const test_router = express.Router()

// input: ID, output: object
test_router.get("/send", async (req, res)=>{
    await AD.findOne({ID: req.body.ID}).then(result=>{
        if(!result){
            res.json("error")
        }
        res.json(result)
    })
})

// input: ID, output: URL
test_router.get("/webview", async (req, res)=>{
    await AD.findOne({ID: req.body.ID}).then(result=>{
        if(!result){
            res.json("error")
        }
        res.json(result.URL)
    })
})

export default test_router