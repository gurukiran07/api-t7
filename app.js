const express = require('express');
const mongoose = require('mongoose');
const app = express();

const route = require('./routes/routes');
const mongoURL = "mongodb+srv://jgkiran07:Qazxswedc0@t7.w0xgpms.mongodb.net/web-t7?retryWrites=true&w=majority"
mongoose.connect(mongoURL, {useNewUrlParser: true}).then(() => {
    console.log("MongoDB connected");
}).catch((err) => {
    console.log("Mongo Connection failed", err)
});

app.use(express.json());
app.use('', route);

module.exports = app