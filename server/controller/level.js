const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getLevels: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .find({"_id": req.body.id}).toArray()
            .then((result) => {
                res.json(result.levels);
            })
            .catch((err) => {
                throw err;
            });
    },
    getLevel: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .findOne({"_id": req.body.id, "levels._id":req.body.levelId})
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addLevel: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let level = {
            levelId: ObjectId(),
            levelName: req.body.levelName,
            levelDescription: req.body.levelDescription,
            difficulty: req.body.difficulty,
            testCases: req.body.testCases ? req.body.testCases : [],
            submissions: [],
        };

        db_connect.collection("courses")
            .find({
                "_id": ObjectId(req.body.id), 
                "levels.levelName": req.body.levelName
                })
            .then((result) => {
                if (!result) {
                    db_connect.collection("courses").findOne({"_id": ObjectId(req.body.id)}, function (req1, res1) {
                        var levels = res1.levels;
                        levels.push(level);

                        db_connect.collection("courses").updateOne({"_id": ObjectId(req.body.id)}, {$set: {"levels": levels}}, function (err, response) {
                            if (err) throw err;
                            return res.json(response);
                          });
                    });  
                  }
                  else {
                    return res.json({ message: 'This level has already been created!' });
                  }
            })
            .catch((err) => {
                throw err;
            });
        
    }
}