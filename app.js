var express = require('express');
app = express();
const server = 1337;

app.set("view engine", "ejs");

// =============================
// GET Routes                 ==
// =============================

app.get('/', function(req, res){
    res.render('home');
});

app.get("/campgrounds", function(req, res){
    var campgrounds = [
        {name:"Beaver Bend", image:"https://static.pexels.com/photos/558454/pexels-photo-558454.jpeg"},
        {name:"Foss Creek", image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg"},
        {name:"Arch Linux Pass", image:"https://static.pexels.com/photos/5922/wood-holiday-vacation-vintage.jpg"}
    ];

    res.render('campgrounds', {campgrounds:campgrounds});
});



// =============================
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});