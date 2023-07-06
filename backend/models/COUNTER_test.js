import mongoose from 'mongoose'

const COUNTER_test_Schema = new mongoose.Schema({
    count: {
        type: Number,
        default: 0
    },
})

export const COUNTER_test = mongoose.model("COUNTER_test", COUNTER_test_Schema)