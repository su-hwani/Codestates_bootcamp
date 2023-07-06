import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"
import { COUNTER_test } from "../models/COUNTER_test.js"
export { find_AD, find_COUNTER}

async function find_AD(ID) {
    const result = await AD.findOne({ID: ID})
    return result
} 

async function find_COUNTER() {
    const result = await COUNTER_test.findOne()

    if(!result){
        const counter = new COUNTER_test({})
        counter.save()
        return counter
    }

    const counter = result
    counter.count += 1
    counter.save()

    return counter
}
