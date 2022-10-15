const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getCourses: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .find({}).sort({"name":1}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    getCourse: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .findOne({"_id": ObjectId(req.body.id)})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addCourse: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let course = {
            name: req.body.name,
            concept: req.body.concept,
            description: req.body.description,
            levels: req.body.levels,
            creatorId: req.body.creatorId,
        };

        db_connect.collection("courses").findOne({"name": req.body.name, "concept": req.body.concept})
        .then(result => {
            if (!result) {
                db_connect.collection("courses").insertOne(course, function(err, response) {
                    if (err) throw err;
                    return res.json(response);
                });
            }
            else {
                return res.json({ message: 'This course has already been created!' });
            }
        }) 
    }
}