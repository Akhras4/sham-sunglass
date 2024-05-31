const express=require("express");
const http = require('http');
const routes = require("./roots/roots");
const mongoose=require("mongoose");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const path = require('path');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));

app.use(cookieParser());
app.use(
  bodyParser.json({
      verify: function(req, res, buf) {
          req.rawBody = buf;
      }
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use('/public/images', express.static(path.join(__dirname, 'public/images')))
app.use('/public/video', express.static(path.join(__dirname, 'public/video')))
app.set("view engine","ejs");
app.use(cors(
  {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
));
app.use(express.static("public"));
app.use('/images', express.static('images'));





const PORT = process.env.PORT ;
const password=process.env.password
const MSKS=process.env.MSKS

const urldb=`mongodb+srv://akhras:${password}@akhras.yjxfgn6.mongodb.net/`
mongoose.connect(urldb)
        .then((result)=>console.log("connected to db"))
        .catch((err)=>console.log("err"))


// mahtab'public' directory
app.use('/', routes);





server.listen(PORT, () =>
  console.log(`Server started at http://localhost:${PORT}`)
);