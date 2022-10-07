const dbo = require("../db/conn");

module.exports = {
    getTestcases: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .find({"courses._id": req.body.id}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    getTestcase: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .find({"_id": req.body.id, "levels._id":req.body.levelId}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addTestcase: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let level = {
            questionName: req.body.questionName,
            questionDescription: req.body.questionDescription,
            difficulty: req.body.difficulty,
            testCases: req.body.testCases,
        };

        db_connect.collection("courses")
            .find({
                "_id": req.body.id, 
                "levels.questionName": req.body.questionName
                })
            .toArray()
            .then((result) => {
                if (result.length === 0) {
                    db_connect.collection("courses").findOne({"_id": req.body.id}, function (req1, res1) {
                        const levels = res1.levels.push(level);
                        db_connect.collection("courses").updateOne({"_id": req.body.id}, {$set: {"levels": levels}}, function (err, response) {
                            if (err) throw err;
                            return res.json(response);
                          });
                    });  
                  }
                  else {
                    return res.json({ message: 'This question has already been created!' });
                  }
                  response.json(result);
            })
            .catch((err) => {
                throw err;
            });
        
    }
}