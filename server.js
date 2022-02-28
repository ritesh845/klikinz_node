const express = require('express');
const fileUpload = require("express-fileupload");
const cors = require('cors');
var morgan = require('morgan');

require('dotenv').config();
require('./config/database');
const app = express();
const port = process.env.PORT  || 5000; 


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(fileUpload());
app.use(cors());

const authRoutes = require('./routes/auth.routes');
app.use('/api',authRoutes);
app.get('/', function(req, res) {
    res.send('Page under construction.');
  });

app.listen(port, () => {
    console.log(`Klikinz app listening on port ${port}!`);
});