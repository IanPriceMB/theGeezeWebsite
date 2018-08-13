//various npms
var express = require("express");
var mongojs = require("mongojs");
var cheerio = require("cheerio");
var request = require("request");

//exrpess
var PORT = process.env.PORT || 8080
var app = express();

//my database connection to mongoDB
var databaseUrl = "theGeeze";
var collections = ["geezeVideos"];
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

//denoting my static front end files for use
app.use('/geeze', express.static(__dirname + '/public/'));

//when we call for videos we will return the json to the front end
app.get("/geeze/videos", function(req, res) {
  db.geezeVideos.find({}, function(error, found) {
    if (error) {
      console.log('err '+error);
    }
    else {
      res.json(found);
    }
  });
});

//for whatever reason the static folder only worked if i gave it a route
//this ensures that no matter what i will hit my homepage route of /geeze
app.get("*", function(req, res) {
  res.redirect('/geeze')
});

// just a flag for the server so I know when the scrape runs
console.log("\n***********************************\n" +
            "Grabbing Geeze videos\n" +
            "\n***********************************\n");
// this section runs right away, populated the db with the most recent geeze vids
request("https://www.youtube.com/channel/UCbpeUIK9EQohTXRxYmbBFXw/videos", function(error, response, html) {
  
  var $ = cheerio.load(html);

  $("a[title~='Geeze']").each(function(i, element) {

    var title = $(element).text();
    var link = $(element).attr("href");

    if (title && link) {
      db.geezeVideos.findOne({
        title: title
      },
      function(err, found) {
        if (err) {
          console.log('err '+err);
        }
        else if (!(found === null)) {
          console.log('found '+found)
        }
        else if (found === null) {
          db.geezeVideos.insert({
            title: title,
            link: link
          },
          function(err, inserted) {
            if (err) {
              console.log('err '+err);
            }
            else {
              console.log('inserted '+inserted)
            }
          })
        }
      });
    }
  });
});

//setting up my server port
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
