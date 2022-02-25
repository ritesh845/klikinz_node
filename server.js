const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require("multer");
require('dotenv').config();
const app = express();
const port = process.env.PORT  || 5000; 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(multer().any());



const authRoutes = require('./routes/auth.routes');
app.use('/api',authRoutes);


app.listen(port, () => {
    console.log(`Klikinz app listening on port ${port}!`);
});