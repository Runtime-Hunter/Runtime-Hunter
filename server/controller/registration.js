const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const dbo = require("../db/conn");


module.exports = {
// This section will help you create a new users.
signup: async (req, response) => {
    let db_connect = dbo.getDb("runtime-hunter");
  
    let user = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      userType: 1, // player
      gamesBeingPlayed: [],
    };
  
    // hashing time
    const saltRounds = 10;
  
    // encrypting the password
    bcrypt.genSalt(saltRounds, function (saltError, salt) {
      if (saltError) {
        return saltError
      } else {
        bcrypt.hash(req.body.password, salt, function (hashError, hash) {
          if (hashError) {
            return hashError
          }
  
          user.password = hash;
  
          // inserting to users collection after hashing

          db_connect.collection("users").find({ "email": req.body.email }).toArray()
            .then((result) => {
              if (result.length === 0) {
                db_connect.collection("users").insertOne(user, function (err, res) {
                  if (err) throw err;
                  return response.json(res);
                });
              }
              else {
                return response.json({ message: 'This email has already been used!' });
              }
            })
        })
      }
    })  
  
  },

// This section will help you get a single users by email
login: async (req, res) => {
    let db_connect = dbo.getDb("runtime-hunter");
    let myquery = {"email": req.params.email};
    let currUser = req.body.data.user;
    db_connect
      .collection("users")
      .findOne(myquery, async (err, result) => {
        if (err) console.log(err.message);
  
        if (result) {
          const validPassword = await bcrypt.compare(currUser.password, result.password);
          if (validPassword) {
            return res.status(200).json(result);
          } else {
            return res.status(200).json({ message: "Invalid Password" });
          }
        }
        else {
          return res.status(200).json({ message: "Invalid E-mail" });
        }
      });
  }
};