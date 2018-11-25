var express = require('express');
var app = express();
var fs = require("fs");
var path = require('path');
var bodyParser = require('body-parser');

var routes = require('./routes/index');


app.set('views', path.join(__dirname, 'views'));

/* Render HTML  Start */
var cons = require('consolidate');

// view engine setup
app.engine('html', cons.swig)
app.set('view engine', 'html');

//jade
app.set('view engine', 'jade');

app.use(express.static('app'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());


app.get('/welcome', function(req, res){
return res.send('Welcome to Module 2 Homework!');

});

app.get('/1',function(req,res)
       {
        return res.send("Hello Just testing!!!");
        });

app.use('/', routes);

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/public/" + "users.json", 'utf8', function (err, data) {
      console.log( data );
      res.end( data );
   });
});

app.use(function(req, res, next){
  res.locals.user = req.user;
//  res.locals.authenticated = ! req.user.anonymous;
  next();
});

app.set('view engine', 'ejs')

//var html = new EJS({url: 'simple.ejs'}).render(data);

app.get('/ejs', (req, res) => {
  var users;
  fs.readFile( __dirname + "/Public/" + "users.json", 'utf8', function (err, result) {
      users = JSON.parse(JSON.stringify(result));
      console.log(users);
      res.render('simple.ejs', {users:users})
     });  
   });
   

//Preferred Section
app.get('/users', (req, res) => {
  //var users;
  fs.readFile( __dirname + "/Public/" + "users.json", 'utf8', function (err, result) {
     // users = JSON.parse(JSON.stringify(data) );
      
    //  res.locals.users=JSON.parse(JSON.stringify(data));
    //  res.render('simple.ejs', users)
       res.render('simple.ejs',{users:result});

     });  
   });
   

    app.listen(5000, function () {
        console.log('Our app is listening on port 5000!');
    });