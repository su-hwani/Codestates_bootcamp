import mongoose from 'mongoose'

const AD_Schema = new mongoose.Schema({
    ID: {
        type: Number,
        //unique: true,
        //required: true
    },
    size: {
        type: [Number],
        //required: true
    },
    title: String,
    text: String,
    image: String,
    URL: String,
    count: {
        type: Number,
        default: 0
    },
    format: String,
    byte: Number,
    start_exp: {
        type: Date,
        //required: true
    },
    end_exp: {
        type: Date,
        //required: true
    },
    reg: {
        type: Date,
        //required: true
    },
    Contract_ID: {
        type: Number,
        //required: true
        // 중복 가능.
    },
    Expense: {
        type: Number
        //required:true
    }
})

export const AD = mongoose.model("AD", AD_Schema)
