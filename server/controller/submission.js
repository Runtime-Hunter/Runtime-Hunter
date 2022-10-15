const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getSubmissions: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("submissions")
            .find({}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    getSubmission: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("submissions")
            .findOne({"_id": ObjectId(req.body.submissionId)})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    getUserQuestionSubmission: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("submissions")
            .find({"userId": req.body.userId, "levelId": req.body.levelId}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    getUserSubmissions: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("submissions")
            .find({"userId": req.body.userId}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addSubmission: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let submission = {
            userId: req.body.userId,
            levelId: req.body.levelId,
            courseId: req.body.courseId,
            timeSubmitted: req.body.timeSubmitted,
            status: req.body.status,
            runtime: req.body.runtime,
            language: req.body.language,
        };

        db_connect.collection("submissions")
            .findOne({
                "_id": ObjectId(req.body.submissionId), 
                })
            .then((result) => {
                db_connect.collection("submissions").insertOne(submission, function(err, response) {
                    if (err) throw err;
                    return res.json(response);
                });    
            })
            .catch((err) => {
                throw err;
            });
        
    }
}