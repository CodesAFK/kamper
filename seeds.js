var mongoose = require("mongoose"),
Campground = require('./models/campground'),
Comment = require('./models/comment');

seedData = [
    {
        name:"Cloud 9",
        image:"https://static.pexels.com/photos/699558/pexels-photo-699558.jpeg",
        description:"Not bad.  Price is out of control"
},
    {
        name:"Beavers Bend",
        image:"https://static.pexels.com/photos/297642/pexels-photo-297642.jpeg",
        description:"Down by the river.  No beavers."
    },

    {
        name:"Hot as hell",
        image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg",
        description:"Up on a mountain.  Super Cold."
    }

];




function seedDB(){
    //REMOVE ALL CAMPGROUNDS...

    Campground.remove({}, function(err){
      if(err){

          console.log(err)

      } else {

          console.log("Removed everything!!");
      }
        seedData.forEach(function(seed){
            Campground.create(seed, function(err, campground){
                if(err){
                    console.log(err);
                } else {
                    console.log("Added Campground " + campground.name);

                    Comment.create({
                       text:"This place should have Internet...",
                       author: "Bill"
                    }, function(err, comment){
                        if(err){
                            console.log(err);
                        } else {
                            console.log("Comment Created " + comment);
                            campground.comments.push(comment);
                            campground.save();
                        }
                    });
                }
            })
        });
    });
}



module.exports = seedDB;