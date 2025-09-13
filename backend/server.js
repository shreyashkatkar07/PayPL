const express = require('express');
const cors = require('cors');
const path = require('path');
const compression = require('compression');
require('dotenv').config();

const route = require("./routes/routes");

const app = express();
const allowedOrigins = process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(',') : ['http://localhost:5173'];
app.use(cors({
    origin: allowedOrigins,
    credentials: true
}));
app.use(compression());
app.use(express.json());
// app.use(express.static(path.join(__dirname, 'public')));
app.use('/', route);

app.listen(3000, () => {
    console.log("Server started at 3000");
});