const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json());

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

app.use(routes)

mongoose.connect(process.env.MONGODBURL || "mongodb://localhost/Book", { useNewUrlParser: true, useUnifiedTopology: true });
// to check status of your mongodb connection
mongoose.connection.on('connected', function () { console.log("Mongo DB connected") });
mongoose.connection.on('error', function (err) { console.error(err) });
mongoose.connection.on('disconnected', function () { console.log("Mongo DB disconnected") });

app.listen(process.env.PORT || 3001, function () {
    console.log('Express Server Listening on 3001');
})