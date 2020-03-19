require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const slotsRouter = require("./slots/slots-router");
const charactersRouter = require("./characters/characters-router");
const app = express();

const morganOption = "common"



app.use(helmet());
app.use(morgan(morganOption));
app.use(cors());
app.get("/", (req, res) => {
    res.send("Hello, world!");
});
app.use(charactersRouter);
app.use(slotsRouter)
app.use(function errorHandler(error, req, res, next) {
    let response;
    if (NODE_ENV === "production") {
        // response = { error: { message: "server error" } };
        console.log(error);
    } else {
        console.error(error);
        response = { message: error.message, error };
    }
    res.status(500).json(response);
});

app.use(cors());

module.exports = app;
