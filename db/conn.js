
const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient("mongodb+srv://test:test@cluster0.d2fdy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

var _db;

module.exports = {
  connectToServer: function (callback) {
    client.connect(function (err, db) {
      // Verify we got a good "db" object
      if (db)
      {
        _db = db.db("myFirstDatabase");
        console.log("Successfully connected to MongoDB."); 
      }
      if(err){
        const fs = require('fs');
        fs.writeFile("test.txt", JSON.stringify(err), function(err) {
            if(err) {
                return console.log(err);
            }
            console.log("The file was saved!");
        });
      }
      // return callback(err);
         });
  },

  getDb: function () {
    return _db;
  },
};
