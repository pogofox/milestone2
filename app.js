var express = require('express');
var mysql = require('mysql')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(__dirname));

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'pogofox',
  password: 'pogofox725',
  database: 'milestone_2'
})

var name;

connection.connect(function(err) {
  if (err) throw err
  console.log('You are now connected...')
})

connection.query('SELECT * FROM users', function (err, rows, fields) {
  if (err) throw err
  //console.log('blogs', {blogs: rows});
})

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/quiz', function(req, res){
  res.render('quiz', {name: name})
});

app.post('/quiz', function(req, res){
  var sum = 0;
  if (req.body.q1 == 1) {
    sum = sum + 1;
  }
  if (req.body.q2 == 1) {
    sum = sum + 1;
  }
  if (req.body.q3 == 1) {
    sum = sum + 1;
  }
  if (req.body.q4 == 1) {
    sum = sum + 1;
  }
  console.log(req.body.name);
  var data = {
    name : req.body.name,
    score : sum
  };
  var query = connection.query("INSERT INTO users set ?", data , function(err, rows) {
    res.redirect('/highScores')
  });
})

app.get('/highScores', function(req, res){
  var users;
  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err
    console.log(rows[1].name);
    users = rows;
    users2 = users.sort(function(a, b) {
      return parseFloat(b.score) - parseFloat(a.score);
    });
    res.render('highScores', {users: users2});
  })
});

app.get('/', function(req, res){
  res.render('index');
});

app.post('/', function(req, res){
  name = req.body.name;
  res.redirect('/quiz');
});

app.listen(3000, function(){
  console.log("The server is running on localhost:3000")
})
