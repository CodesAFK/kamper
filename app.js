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




// =============================
// Start Server               ==
// =============================

app.listen(server, function(){
   console.log("Server started on " + server);
});