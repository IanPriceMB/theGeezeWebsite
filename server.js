var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

var app = express();
var databaseUrl = "theGeeze";
var collections = ["geezeVideos"];


var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

app.use('/geeze', express.static(__dirname + '/public/'));

app.get("/geeze/videos", function(req, res) {
  db.geezeVideos.find({}, function(error, found) {
    if (error) {
      console.log(error);
    }
    else {
      res.json(found);
    }
  });
});

app.get("*", function(req, res) {
  res.redirect('/geeze')
});

console.log("\n***********************************\n" +
            "Grabbing Geeze videos\n" +
            "\n***********************************\n");

request("https://www.youtube.com/channel/UCbpeUIK9EQohTXRxYmbBFXw/videos", function(error, response, html) {
  
  var $ = cheerio.load(html);

  $("a[title~='Geeze']").each(function(i, element) {

    var title = $(element).text();
    var link = $(element).attr("href");

    console.log('title'+title);
    console.log('link'+link);


    if (title && link) {
      db.geezeVideos.findOne({
        title: title
      },
      function(err, found) {
        if (err) {
          console.log(err);
        }
        else if (!(found === null)) {
          console.log('found'+found)
        }
        else if (found === null) {
          db.geezeVideos.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              console.log(err);
            }
            else {
              console.log('inserted'+inserted)
            }
          })
        }
      });
    }
  });
});

app.listen(3000, function() {
  console.log("App running on port 3000!");
});
