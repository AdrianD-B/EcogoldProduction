const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    model: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true
    },
    color:{
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    task: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: () => Date.now()
    },
    progress: {
        type: Number,
        required: true,
        default: 0
    }
});

const Task = mongoose.model('Task', taskSchema,'task');
module.exports = { Task }