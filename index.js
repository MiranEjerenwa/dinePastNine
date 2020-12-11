const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static("assets"));

  app.route("/")
  .get(function(req,res){
      res.sendFile(__dirname + "/index.html");
  });

  app.listen(3000, function(){console.log("dineAfterNine Is Live");});