var express = require('express');
app = express();
var bodyParser = require('body-parser');
const server = 1337;
var campgrounds = [
    {name:"Beaver Bend", image:"https://static.pexels.com/photos/558454/pexels-photo-558454.jpeg"},
    {name:"Foss Creek", image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg"},
    {name:"Arch Linux Pass", image:"https://static.pexels.com/photos/5922/wood-holiday-vacation-vintage.jpg"},
    {name:"Beaver Bend", image:"https://static.pexels.com/photos/558454/pexels-photo-558454.jpeg"},
    {name:"Foss Creek", image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg"},
    {name:"Arch Linux Pass", image:"https://static.pexels.com/photos/5922/wood-holiday-vacation-vintage.jpg"},
    {name:"Beaver Bend", image:"https://static.pexels.com/photos/558454/pexels-photo-558454.jpeg"},
    {name:"Foss Creek", image:"https://static.pexels.com/photos/216675/pexels-photo-216675.jpeg"},
    {name:"Arch Linux Pass", image:"https://static.pexels.com/photos/5922/wood-holiday-vacation-vintage.jpg"}
];

app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine", "ejs");

// =============================
// GET Routes                 ==
// =============================

app.get('/', function(req, res){
    res.render('home');
});

app.get("/campgrounds", function(req, res){

    res.render('campgrounds', {campgrounds:campgrounds});
});

app.get('/campgrounds/new', function(req, res){
    res.render('new');
});

// =============================
// POST Routes                ==
// =============================

app.post('/campgrounds', function(req, res){
  var name = req.body.campgroundName;
  var image = req.body.campgroundImg;
  var newCampground = {name:name, image:image};
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});


// =============================
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});