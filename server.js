// require express and other modules
var express = require('express'),
    app = express();

// parse incoming urlencoded form data
// and populate the req.body object
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// allow cross origin requests (optional)
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

/************
 * DATABASE *
 ************/

var db = require('./models');

/**********
 * ROUTES *
 **********/

// Serve static files from the `/public` directory:
// i.e. `/images`, `/scripts`, `/styles`
app.use(express.static('public'));

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 */

app.get('/api', function apiIndex(req, res) {
  // TODO: Document all your api endpoints below as a simple hardcoded JSON object.
  // It would be seriously overkill to save any of this to your database.
  res.json({
    message: "Welcome to my personal api! Here's what you need to know!",
    documentationUrl: "https://github.com/puan0601/express_self_api/README.md",
    baseUrl: "http://young-gorge-60197.herokuapp.com",
    endpoints: [
      {method: "GET", path: "/api", description: "Describes all available endpoints"},
      {method: "GET", path: "/api/profile", description: "Data about me"},
      {method: "GET", pagh: "/api/ventures", description: "Get a list of ventures"},
      {method: "POST", path: "/api/ventures", description: "Create a new venture"},
      {method: "GET", path: "/api/ventures/:index", description: "Get info on a specific venture by index"},
      {method: "PUT", path: "/api/ventures/:index", description: "Update info on a specific venture by index"},
      {method: "DELETE", path: "/api/ventures/:index", description: "Delete a specific venture by index"}
    ]
  });
});

//lists profile info as json object
app.get('/api/profile', function aboutMe(req, res) {
  res.json({
    name: 'Anton Pugach',
    githubLink: 'https://github.com/puan0601',
    githubProfileImage: 'https://avatars3.githubusercontent.com/u/19850945?v=3&s=460',
    personalSiteLink: 'https://puan0601.github.io/',
    currentCity: 'San Francisco',
    pets: ['Princess', 'Putin', 'Chantel', 'Nathan', 'Stella', 'CrookShanks']
  });
});

//lists all ventures
app.get('/api/ventures', function listVentures(req, res) {
  db.Venture.find({}, function (err, allventures) {
    if (err) {res.send("Unable to list all ventures")}
    res.json({ventures: allVentures});

});

//creates new venture
app.post('/api/ventures', function create(req, res) {
  var newVenture = new db.Venture(req.body);

  //save new venture in db
  newVenture.save(function(err, savedVenture) {
    if (err) {res.send("Unable to save venture in db");
    res.json(savedVenture);
    }
  });
});

/**********
 * SERVER *
 **********/

// listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log('Express server is up and running on http://localhost:3000/');
});
