require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const express = require("express");

const mongoHost = process.env.MONGO_HOST;
const mongoPort = process.env.MONGO_PORT;
const mongoDatabase = process.env.MONGO_DATABASE;
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoUrl = `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}`

mongoose.connect(mongoUrl)
    .then(() => {
        app.listen(port, () => {
            console.log(`=== Server is running on port ${port}`);
        });
    });

const app = express()
const port = process.env.PORT || 8080;

app.use(morgan("dev"));
app.use("/", require("./routes/index"));