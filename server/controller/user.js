const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getFavs: async (req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");

        db_connect.collection("users").findOne({ "email": req.body.email })
            .then((result) => {
                return result.favs ?? []
            })
    },
    addToFavs: async (req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");

        db_connect.collection("users").update({ "email": req.body.email }, { $addToSet: { favs: req.body.courseId } })
    },
    removeFromFavs: async (req, res) => {

    }
}