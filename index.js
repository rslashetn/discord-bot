/*
  Logs:
    Entry #1: Sep 7th 2017
    Entry #2: Oct 24th 2017
    Entry #3: Dec 1st 2017
    Entry #4: Dec 15th 2017
*/

// Discord setup
var request = require("request");
var Discord = require("discord.io");
var bot = new Discord.Client({
    autorun: true,
    token: "******"
});

// Specific bot setup
var discordPrefix = "!";
var adminId = "110900955968475136";

// Initial Boot Feedback
bot.on('ready', function(event) {
    console.log('Logged in as ' + bot.username + ' with ' + bot.id);
});

// Ending bot Feedback
bot.on('disconnect', function(errMsg, code) {
  if (errMsg) {
    console.log("Error! " + errMsg);
  } else {
    console.log(code);
  }
});

var generalId = 371795004034908161;

// Commands
bot.on('message', function(user, userID, channelID, message, event) {
      if (message === discordPrefix + "ping") {
          bot.sendMessage({
              to: channelID,
              message: "pong"
          });

      }

      if (message === discordPrefix + "myid" || message == discordPrefix + "id") {
          bot.sendMessage({
              to: channelID,
              message: "Your user ID is: " + userID
          });

      }

      if (message === discordPrefix + "channelid") {
          bot.sendMessage({
              to: channelID,
              message: "Your channel ID is: " + channelID
          });

      }

      if (message.includes("!alt")) {
        var strArray = message.split(" ");
        var url = "https://www.cryptopia.co.nz/api/GetMarket/"+ strArray[1] +"_BTC";
        request({
            url: url,
            json: true
        }, function(error, response, body) {

            if (!error && response.statusCode === 200 && body.Data != null) {
                var newPrice = body.Data;
                bot.sendMessage({
                    to: channelID,
                    message: "```Label: " + newPrice.Label + "\nAskPrice: " + newPrice.AskPrice + "\nBidPrice: " + newPrice.BidPrice + "\nOpen: " + newPrice.Open + "```"
                });
            } else {
              bot.sendMessage({
                  to: channelID,
                  message: "```No coin by that symbol.```"
              });
            }
        })
      }

      if (message == discordPrefix + "price") {
        var url = "https://www.cryptopia.co.nz/api/GetMarket/ETN_BTC";
        request({
            url: url,
            json: true
        }, function(error, response, body) {

            if (!error && response.statusCode === 200) {
                var newPrice = body.Data;
                bot.sendMessage({
                    to: channelID,
                    message: "```Label: " + newPrice.Label + "\nAskPrice: " + newPrice.AskPrice + "\nBidPrice: " + newPrice.BidPrice + "\nOpen: " + newPrice.Open + "```"
                });
            }
        })

      }

      if (message == discordPrefix + "btcprice") {

          var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

          request({
              url: url,
              json: true
          }, function(error, response, body) {

              if (!error && response.statusCode === 200) {
                  var newPrice = body.bpi.USD.rate.split(".");
                  bot.sendMessage({
                      to: channelID,
                      message: "$" + newPrice[0]
                  });
              }
          })

      }

      if (message == discordPrefix + "buybtc") {

        bot.sendMessage({
            to: channelID,
            message: "https://www.coinbase.com/join/51fd8a0773bafef3a100001f"
        });
      }

      if (message == discordPrefix + "miners") {
        bot.sendMessage({
            to: channelID,
            message: "A lot."
        });
      }

      if (message == discordPrefix + "reddit") {

        bot.sendMessage({
            to: channelID,
            message: "https://reddit.com/r/Electroneum"
        });
      }

      if (message == discordPrefix + "website") {

        bot.sendMessage({
            to: channelID,
            message: "http://electroneum.com/"
        });
      }

      if (message == discordPrefix + "app") {

        bot.sendMessage({
            to: channelID,
            message: "iOS: Unavailable\nAndroid: https://play.google.com/store/apps/details?id=com.electroneum.app&hl=en"
        });
      }

      if (message == discordPrefix + "help") {

        bot.sendMessage({
            to: channelID,
            message: "```!myid - Returns your user id\n!channelid - Returns current channel id\n!price - Returns current Electroneum price\n!btcprice - Returns current price for Bitcoin\n!reddit - Returns link to subreddit\n!website - Returns link to website\n!app - Returns links to Electroneum applications\n!miners - Returns amount of miners on the reddit pool```"
        });
      }

});
