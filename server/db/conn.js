import { MongoClient } from "mongodb";
import "dotenv/config.js";

const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
 
var _db;
 

export function connectToServer(callback) {
  client.connect(function (err, db) {
    // Verify we got a good "db" object
    if (db) {

      _db = db.db("runtime-hunter");

      console.log("Successfully connected to MongoDB.");
    }
    return callback(err);
  });
}
export function getDb() {
  return _db;
}