import AWS from 'aws-sdk';
import express from "express";
import path from 'path';
import bodyParser from "body-parser";
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Console } from 'console';


// constants
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const HTTP_PORT = 3300
const RESPONSE_OK = 'OK'

// app methods 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(HTTP_PORT, () => console.log('Listening on port : ' + HTTP_PORT));

app.get('/',(req,res) => {
    res.sendFile(path.join(__dirname + '/frontend-UI.html'));
});

app.post('/',(req,res) => {
    console.log("Inside POST node");

    //var emailDict = {'group1': 'nandikachirala@gmail.com', 'group2': 'nandika.chirala@vanderbilt.edu', 'group3': 'nitinbali2801@gmail.com'};
    //var recipients = req.body["recipients"];
    var subject = req.body["subject"];
    var emailBody = req.body["message"];

    //console.log(recipients);
    console.log(subject);
    console.log(emailBody);
  
  // Set the region 
  AWS.config.update({region: 'us-west-2'});
  // Create sendEmail params
    var params = {
      Destination: { /* required */
        CcAddresses: [
          'nandikachirala@gmail.com',
          /* more items */
        ],
        ToAddresses: [
          'nandikachirala@gmail.com',
          /* more items */
        ]
      },
      Message: { /* required */
        Body: { /* required */
          Html: {
           Charset: "UTF-8",
           Data: emailBody
          },
          Text: {
           Charset: "UTF-8",
           Data: "whats this ???? Check "
          }
         },
         Subject: {
          Charset: 'UTF-8',
          Data: subject
         }
        },
      Source: 'nandikachirala@gmail.com', /* required */
      ReplyToAddresses: [
        /* more items */
      ],
    };
    
    // Create the promise and SES service object
    var sendPromise = new AWS.SES({apiVersion: '2010-12-01'}).sendEmail(params).promise();
    
    // Handle promise's fulfilled/rejected states
    sendPromise.then(
      function(data) {
        console.log(data.MessageId);
      }).catch(
        function(err) {
        console.error(err, err.stack);
      });
    
    return res.send('post completed successfully');
});
