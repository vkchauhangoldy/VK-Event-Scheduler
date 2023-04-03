const mongoose = require('mongoose')

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true,
        maxlength:50
    },
    description: {
        type: String,
        required:true,
        maxlength:150
    },
    location: {
        type: String,
        required:true
    },
    startTime: {
        type: Date,
        required:true
    },
    endTime: {
        type: Date,
        required:true
    }
})
const event = mongoose.model('event', eventSchema)
module.exports = event;