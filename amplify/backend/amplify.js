// Use this code snippet in your app.
// If you need more information about configurations or implementing the sample code, visit the AWS docs:
// https://aws.amazon.com/developers/getting-started/nodejs/
// exports.handler = async (event) => {


    let APIKEY = "";
    // Load the AWS SDK
    var AWS = require('aws-sdk'),
        region = "us-east-1",
        secretName = "googleAPIKey",
        secret,
        decodedBinarySecret;
    
    // Create a Secrets Manager client
    var client = new AWS.SecretsManager({
        region: region
    });
    
    // In this sample we only handle the specific exceptions for the 'GetSecretValue' API.
    // See https://docs.aws.amazon.com/secretsmanager/latest/apireference/API_GetSecretValue.html
    // We rethrow the exception by default.
    
    client.getSecretValue({SecretId: secretName}, function(err, data) {
        if (err) {
            if (err.code === 'DecryptionFailureException')
                // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InternalServiceErrorException')
                // An error occurred on the server side.
                // Deal with the exception here, and/or rethrow at your discretion.
                
                throw err;
            else if (err.code === 'InvalidParameterException')
                // You provided an invalid value for a parameter.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'InvalidRequestException')
                // You provided a parameter value that is not valid for the current state of the resource.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
            else if (err.code === 'ResourceNotFoundException')
                // We can't find the resource that you asked for.
                // Deal with the exception here, and/or rethrow at your discretion.
                throw err;
        }
        else {
            // Decrypts secret using the associated KMS CMK.
            // Depending on whether the secret is a string or binary, one of these fields will be populated.
            if ('SecretString' in data) {
                secret = data.SecretString;
                APIKEY = JSON.parse(secret);
                
                // console.log("secrets: "+ APIKEY.APIKEY );
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.toString('ascii');
            }
        }
        
        APIKEY = APIKEY.GoogleAPIkey;
        // console.log(APIKEY);
    // Your code goes here. 
    
        // require("dotenv").config();
    // const APIKEY = process.env.APIKEY;

const express = require("express");
const app = express();
const https = require("https");
const bodyParser = require("body-parser");
const ejs = require("ejs");


app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(express.static("assets"));
  app.set("view engine", "ejs");

  app.route("/")
  .get(function(req,res){
    //   res.sendFile(__dirname + "/index.html");
    res.render("index.ejs");
  }).post(function(req,res){
    res.send(req.body.userSearch);
  })





  app.listen(process.env.PORT || 3000, function(){console.log("dineAfterNine Is Live");});


  
});


