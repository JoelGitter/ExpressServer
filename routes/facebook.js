const express = require("express");
const { ReplSet } = require("mongodb");

// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");

// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you create a new record.
recordRoutes.route("/facebook/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    accessToken: req.body.accessToken,
    data_access_expiration_time: req.body.data_access_expiration_time,
    expiresIn: req.body.expiresIn,
    graphDomain: req.body.graphDomain,
    userID: req.body.userID,
  };

  
  db_connect
  .collection("socialMediaAccounts")
  .find({userID:{$eq:myobj.userID}})
  .toArray(function (err, result) {
    if(err) throw err;
    if(result.count() == 0){
        db_connect.collection("socialMediaAccounts").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
    }
  });
});

module.exports = recordRoutes;
