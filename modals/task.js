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
        default: () => new Date().toLocaleDateString('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '-')
    },
    progress: {
        type: Number,
        required: true,
        default: 0

    },
    completiondate: {
        type: Date
    }
});

const Task = mongoose.model('Task', taskSchema,'task');
module.exports = { Task }