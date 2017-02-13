// This file allows us to seed our application with data
// simply run: `node seed.js` from the root of this project folder.

var db = require('./models');

var new_venture = {description: "OhShii"};

db.Venture.create(new_venture, function(err, venture){
  if (err){
    return console.log("Error:", err);
  }

  console.log("Created new venture", venture._id);
  process.exit(); // we're all done! Exit the program.
});
