import mongoose from 'mongoose'

const AD_Schema = new mongoose.Schema({
    ID: String,
    NUM: Number,
})

export const AD = mongoose.model("AD", AD_Schema)