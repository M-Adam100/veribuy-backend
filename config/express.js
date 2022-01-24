const express = require("express");
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(express.json());
app.use(express.urlencoded({     // to support URL-encoded bodies
    extended: true
})); 
app.use(cookieParser());
app.use(cors());

app.listen({ port: process.env.PORT }, async () => {
  console.log(`app listening on port ${process.env.PORT}!`);
});

module.exports = app;