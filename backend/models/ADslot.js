import mongoose from 'mongoose'

const ADslot_Schema = new mongoose.Schema({
    ID: {
        type: Number,
        // unique: true,
        // required: true,
    },
    LENGTH: Number,
    AD_SIZE: [ Number ], // object 형태
    AD_ID: [ Number ] // list 형태
})

export const AD = mongoose.model("AD", AD_Schema)