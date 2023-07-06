import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import axios from 'axios'
import nodemon from 'nodemon'

import { AD } from "../models/AD.js"
import { COUNTER_test } from "../models/COUNTER_test.js"

// 특정 ID 갖는 AD 유무 확인 
export async function find_AD(ID) {
    const result = await AD.findOne({ID: ID})
    return result
} 

// AD activation 여부 체크  -> Promise(false)는 일반 false 와 달리 true 로 취급됨!!!
export function chkActivation(AD) {
    return AD.activation
}

// ID 값 생성
export async function find_COUNTER() {
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