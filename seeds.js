var mongoose = require("mongoose"),
Campground = require('./models/campground'),
Comment = require('./models/comment');

seedData = [
    {
        name:"Cloud 9",
        image:"https://static.pexels.com/photos/699558/pexels-photo-699558.jpeg",
        description:"Mainframe spoof else pwned default break if finally worm ip overflow it's a feature d00dz socket mutex piggyback ifdef Trojan horse. Sql foo long ack grep over clock for double bytes try catch *.* public race condition emacs headers wabbit flood todo endif float gobble. Tarball man pages recursively irc eof ddos hack the mainframe cat alloc salt back door cookie frack printf leapfrog I'm compiling nak January 1, 1970."
},
    {
        name:"Beavers Bend",
        image:"https://static.pexels.com/photos/297642/pexels-photo-297642.jpeg",
        description:"Mainframe spoof else pwned default break if finally worm ip overflow it's a feature d00dz socket mutex piggyback ifdef Trojan horse. Sql foo long ack grep over clock for double bytes try catch *.* public race condition emacs headers wabbit flood todo endif float gobble. Tarball man pages recursively irc eof ddos hack the mainframe cat alloc salt back door cookie frack printf leapfrog I'm compiling nak January 1, 1970."
    },

    {
        name:"Hot as hell",
        image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg",
        description:"Mainframe spoof else pwned default break if finally worm ip overflow it's a feature d00dz socket mutex piggyback ifdef Trojan horse. Sql foo long ack grep over clock for double bytes try catch *.* public race condition emacs headers wabbit flood todo endif float gobble. Tarball man pages recursively irc eof ddos hack the mainframe cat alloc salt back door cookie frack printf leapfrog I'm compiling nak January 1, 1970."
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
                            console.log("Comment Created ");
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