const express = require('express')
const router = express.Router()
const bodyparser = require("body-parser")
const eventModel = require("../models/schema")


router.use(bodyparser.json())


// posting all events with condtions

router.post("/v1/events", async (req, res) => {

    try {
        if (req.body.title === "") {
            throw new Error("Validation error: title is required")
        }
        if (req.body.title.length > 50) {
            throw new Error("Validation error: title length should not be greater than 50 char")
        }
        if (req.body.description === "") {
            throw new Error("Validation error: description is required")
        }
        if (req.body.description.length > 150) {
            throw new Error("Validation error: description length should not be greater than 50 char")
        }
        if (req.body.location === "") {
            throw new Error("Validation error: location is required")
        }
        if (req.body.startTime === "") {
            throw new Error("Validation error: startTime is required")
        }
        if (req.body.endTime === "") {
            throw new Error("Validation error: endTime is required")
        }
        const eventData = await eventModel.create({
            title: req.body.title,
            description: req.body.description,
            location: req.body.location,
            startTime: req.body.startTime,
            endTime: req.body.endTime
        })
        res.status(200).json({
            status: "success",
            eventData
        })
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
});


//task2 getting all events

router.get('/v1/events', async (req, res) => {
    try {
        const getEventData = await eventModel.find()
        res.status(200).json(getEventData)
    } catch (err) {
        res.status(400).json({
            status: "Failed",
            message: err.message
        })
    }
})

//get events by particular id

router.get('/v1/events:id', async (req, res) => {
    const id = req.params.id;

    try {
        const eventById = await eventModel.findOne({ _id: id })
        if (!eventById) {
            throw new Error("There is no event with that id")
        }
        res.status(200).json(eventById)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})

//update events by particular id

router.put("/v1/events:id", async (req, res) => {
    const id = { _id: req.params.id }
    try {
        if (req.body.title === "") {
            throw new Error("Validation error: title is required")
        }
        if (req.body.title.length > 50) {
            throw new Error("Validation error: title length should not be greater than 50 char")
        }
        if (req.body.description === "") {
            throw new Error("Validation error: description is required")
        }
        if (req.body.description.length > 150) {
            throw new Error("Validation error: description length should not be greater than 50 char")
        }
        if (req.body.location === "") {
            throw new Error("Validation error: location is required")
        }
        if (req.body.startTime === "") {
            throw new Error("Validation error: startTime is required")
        }
        if (req.body.endTime === "") {
            throw new Error("Validation error: endTime is required")
        }
        const updatedEvent = await eventModel.updateOne(id, req.body)
        res.status(200).json(updatedEvent)
    } catch (err) {
        res.status(404).json({
            message: err.message
        })
    }
})

// delet event by id
router.delete("/v1/events:id", async (req, res) => {
    try {
        const id = req.params.id
        await eventModel.deleteOne({_id: id})
        res.status(204).json("")
    } catch (err) {
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
})

module.exports = router;