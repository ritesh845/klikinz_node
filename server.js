const express = require('express');
const fileUpload = require("express-fileupload");
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT  || 5000; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
app.use('/api',authRoutes);


app.listen(port, () => {
    console.log(`Klikinz app listening on port ${port}!`);
});