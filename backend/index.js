const express = require("express");
const router = require("./Router/chatroute");
const cors = require('cors');
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
dotenv.config();
app.use(express.json());
app.use(cors());

app.use('/',router);

const port = process.env.PORT;
app.listen(port,()=>{
    console.log(`server start at on http://localhost: ${port}`);
})
