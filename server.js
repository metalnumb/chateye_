#!/bin/env node

var express = require('express');
var compression = require('compression');
var fs      = require('fs');
var cors = require('cors');
var Twitter = require('twitter');
var request = require('request');
var language = require('@google-cloud/language');
var bodyParser = require("body-parser");

var apiai = require('apiai');
var app = apiai("686ce1c23e2d49fb9036a728a6ec8b3f");

var client  = new Twitter({
	
		access_token_key:
			'119710335-AKBgvx71f8jmhpuJ0q8Fsh6yOYjSrq0YrZ8hHgnd',
		
		access_token_secret:
			'r96eL48Qd2yEx9C0UJlvd8gwYdHgwlg06UHZQUhH7Lvfp',
		
		consumer_key:
			'wOI0K9TtPnmDRMcaJUM9MW6hL',
		
		consumer_secret:
			'w9zNUnEciOb5nHEtpMyB1m4I1weiIDU5SDkBQuUIoM4rlYqrNt'
}); 	

var params = {screen_name: '_zalterego'};

client.get('followers/list', params, function(error, followers, response){
  if (!error) {

  // https://api.twitter.com/1.1/search/tweets.json
  // ?q=from%3ACmdr_Hadfield%20%23nasa&result_type=popular

// Following 

//Object.keys(followers).forEach(function (key) {
//  var val = followers[key];
//  console.log(val[0]);
  // console.log(key);
   // do something with key or value
// });

  }
});



var App = function() {

    var self = this; 

    self.initializeServer = function() {
		
		self.app = express();
    self.app.use(express.static('static'));

        self.app.set('port', (process.env.PORT || 8080));
     
        self.app.use(compression()); 
        self.app.use(cors());
     

        self.app.use(bodyParser.urlencoded({ extended: false }));
		self.app.use(bodyParser.json());


var languageClient = language({
  projectId: 'nlpi-162211',
  keyFilename:'./NLPI-c6ba16b1d273.json'
});




 

 /**
  * 

result: { 

  source: 'agent',
  resolvedQuery: 'Hi there!',
  action: '',
  actionIncomplete: false,
  
  parameters: { greetings: 'Hello, there!' },
  contexts: [],

  metadata: { 
    intentId: 'e3a3186e-3edd-4cf7-a72e-6cc649c3afc3',
    webhookUsed: 'false',
    webhookForSlotFillingUsed: 'false',
    intentName: 'greet' },
    
  fulfillment: { 
      speech: 'Aloha! How\'s your day going!?', messages: [Object] },
      score: 1 },
      status: { code: 200, errorType: 'success' },
      sessionId: '1450043748391296' 
}


  */




// ============= CHATZER! - CHATBOT for FB Messenger Challenge! ==============
// Chatzer! The anti-boredom chatbot!
    // -A- Connects to Instagram/Twitter/Youtube for entertainment suggestions! (~heavy usage of messengerAPI here~)
    // -B- Talkative Personality !
        // GoogleNLP - define sentiment of messages
        // Route to Multiple intents (Trainable AI using recast.ai / api.ai)

function callSendAPI(messageData) {

// Set the headers
var headers = {
    'User-Agent':       'Super Agent/0.0.1',
    'Content-Type':     'application/x-www-form-urlencoded'
};

var options = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: { access_token: 'EAAXdsmtZAx2oBAElkgercsynCvZCqOpoC34wffTFgboGO4j5h02kmmy4SiJ1ayBjcvQ8A2r40JUvn9hptnZCuen9A6t7xoYIcff6Yj3xuckHlZCLPhe2O9S44xRSFSQhL0b82unbVO63NNH1fu1EVDhJ2X51GSpFCzXUytDNOgZDZD' },
    method: 'POST',
    json: messageData
};

request(options, function (error, response, body) {
    if (!error && response.statusCode == 200) {

      var recipientId = body.recipient_id;
      var messageId = body.message_id;

      console.log("Successfully sent generic message with id %s to recipient %s", 
        messageId, recipientId);
    } else {
      console.error("Unable to send message.");
      console.error(response);
      console.error(error);
    }
  });

}

function sendMediaMessage(recipientId, message) {

  var messageAttachments = message.attachments;
  var messageAttachments = messageAttachments[0];
  
  var messageAttachments = {
    type: messageAttachments.type,
      payload: {
        url: messageAttachments.payload.url
      }
      };

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: { 
      attachment: JSON.stringify(messageAttachments) 
    }
  };


/* EXPECTED FORMAT */
/*
'
{
  "recipient":{
    "id":"USER_ID"
  },
  "message":{
    "attachment":{
      "type":"image",
      "payload":{
        "url":"https://petersapparel.com/img/shirt.png"
      }
    }
  }
}
'
*/

 callSendAPI(messageData);            

}


function sendTextMessage(recipientId, messageText) {

  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      text: messageText
    }
  };

  callSendAPI(messageData);
}

function sendGenericMessage(recipientId, messageText) {
  var messageData = {
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: [{
            title: "rift",
            subtitle: "Next-generation virtual reality",
            item_url: "https://www.oculus.com/en-us/rift/",               
            image_url: "http://messengerdemo.parseapp.com/img/rift.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/rift/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for first bubble",
            }],
          }, {
            title: "touch",
            subtitle: "Your Hands, Now in VR",
            item_url: "https://www.oculus.com/en-us/touch/",               
            image_url: "http://messengerdemo.parseapp.com/img/touch.png",
            buttons: [{
              type: "web_url",
              url: "https://www.oculus.com/en-us/touch/",
              title: "Open Web URL"
            }, {
              type: "postback",
              title: "Call Postback",
              payload: "Payload for second bubble",
            }]
          }]
        }
      }
    }
  };  

  callSendAPI(messageData);

}



function receivedMessage(event) {

  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfMessage = event.timestamp;
  var message = event.message;

  console.log("Received message for user %d and page %d at %d with message:", 
    senderID, recipientID, timeOfMessage);
  console.log(JSON.stringify(message));

  var messageId = message.mid;

  var messageText = message.text;
  var messageAttachments = message.attachments;





  if (messageText) {

    // If we receive a text message, check to see if it matches a keyword
    // and send back the example. Otherwise, just echo the text we received.
    switch (messageText) {
      case 'generic':
        sendGenericMessage(senderID);
        break;

      default:
        var reqs = app.textRequest(messageText, {
        sessionId: senderID
});
 

 /**
  * 

   result:
   { source: 'agent',
     resolvedQuery: 'hi',
     action: 'send_self_id',
      actionIncomplete: false,
      parameters: { greetings: 'Hello, there!' },
     contexts: [],
     metadata:
      { intentId: 'e3a3186e-3edd-4cf7-a72e-6cc649c3afc3',
        webhookUsed: 'false',
        webhookForSlotFillingUsed: 'false',
        intentName: 'greet_user' },
     fulfillment: { 
        speech: 'Hello!', 
        messages: {
          "title":"Chatzer!",
          "subtitle":"",
          "imageUrl":"https://fb-s-d-a.akamaihd.net/h-ak-xfp1/v/t1.0-9/17191310_1886318901589735_6240676010806644895_n.png?oh=a43f0c821833b413be3589ae32f4cb17&oe=59698AD9&__gda__=1499001758_2de2bfd6b78c206cdc14e4b233094bef",
          "buttons":[],"type":1} 
    },
     
     score: 1 },
  status: { code: 200, errorType: 'success' },
   sessionId: '1450043748391296' }



  */
reqs.on('response', function(response) {

var mediaObj = response.result.fulfillment.messages[1];
console.log(JSON.stringify(mediaObj));

var textObj = response.result.fulfillment.speech; 
console.log(textObj);

sendTextMessage(senderID, textObj);
sendMediaMessage(senderID,mediaObj);


});
 
reqs.on('error', function(error) {
    console.log(error);
});
 
reqs.end();

    }

    var document = languageClient.document(messageText);
    document.detectSentiment(function(err, sentiment) { 
  
    var score = JSON.stringify(sentiment.score);          
    var magnitude = JSON.stringify(sentiment.magnitude);  

    console.log("Score = " + score + " | Magnitude = " + magnitude);

    // sendTextMessage(senderID, "Score = " + score + " | Magnitude = " + magnitude);
 
});

  } else if (messageAttachments) {

    sendMediaMessage(senderID, message); 
  } 


}




self.app.post('/ai', function(req, res) {
  
  /** VERIFICATION CODE = DONE! **/
/*
           if (request.query['hub.mode'] === 'subscribe' &&
      request.query['hub.verify_token'] === 'chatzer') {
    console.log("Validating webhook");
    response.status(200).send(request.query['hub.challenge']);
  } else {
    console.error("Failed validation. Make sure the validation tokens match.");
    response.send(403);          
  }
*/   

var data = req.body;

  // Make sure this is a page subscription
  if (data.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    data.entry.forEach(function(entry) {
      var pageID = entry.id;
      var timeOfEvent = entry.time;

      // Iterate over each messaging event
      entry.messaging.forEach(function(event) {
        if (event.message) {
          receivedMessage(event);
        } else {
          console.log("Webhook received unknown event: ", event);
        }
      });
    });

    // Assume all went well.
    // You must send back a 200, within 20 seconds, to let us know
    // you've successfully received the callback. Otherwise, the request
    // will time out and we will keep trying to resend.
    res.send(200);
  }




});




    };

    self.initialize = function() {
        self.initializeServer();		
    };
    self.start = function() {
        //  Start the app on the specific interface (and port).
        self.app.listen(self.app.get('port'), function() {
            console.log('Node app is running on port', self.app.get('port'));
        });
    };


};


var chatzer = new App();
chatzer.initialize();
chatzer.start();


