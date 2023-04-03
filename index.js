
const express = require('express');
const mongoose = require("mongoose");

const eventRoutes = require('./routes/event');


const app = express();

const port = 5050;

app.get('/', (req, res) => {
    res.send('Everthing is working fine')
})

app.use('/', eventRoutes);


// const url = "mongodb://localhost:27017/events";
const url = "mongodb+srv://vkgoldy:vkgoldy@practice.snolvea.mongodb.net/event-scheduler?retryWrites=true&w=majority";

mongoose.connect(url, {
    useNewUrlParser: true
}).then(() => {
    console.log("connected to database successfully");
}).catch(() => {
    console.log("Failed to connected");
})


app.listen(port, () => {
    console.log(`server is runnig at port ${port}`);
});