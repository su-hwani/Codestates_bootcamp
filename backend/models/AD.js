import mongoose from 'mongoose'

const AD_Schema = new mongoose.Schema({
    ID: String,
})

export const AD = mongoose.model("AD", AD_Schema)