const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getTestcases: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .findOne({"_id": ObjectId(req.body.id), "levels.questionName": req.body.questionName})
            .then((result) => {
                var levels = result.levels;
                for (let i = 0; i < levels.length; i++) {
                    if (levels[i].questionName === req.body.questionName) {
                        return res.json(levels[i].testCases);
                    }
                }
               
            })
            .catch((err) => {
                throw err;
            });
    },
    getTestcase: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .findOne({"_id": ObjectId(req.body.id), "levels.testCases._id": ObjectId(req.body.testcaseId)})
            .then((result) => {
                console.log(res.json(result));

                return res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addTestcase: async(req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let testcase = {
            input: req.body.input,
            output: req.body.output,
            isPassed: req.body.isPassed,
        };

        db_connect.collection("courses")
            .findOne({
                "_id": ObjectId(req.body.id), 
                "levels.questionName": req.body.questionName,
                "levels.testCases.input": req.body.input,                
                })
            .then((result) => {
                if (!result) {
                    db_connect.collection("courses").findOne({"_id": ObjectId(req.body.id), "levels.questionName": {$eq: req.body.questionName}
                }, function (req1, res1) {

                        var levels = res1.levels;
                        for (let i = 0; i < levels.length; i++) {
                            if (levels[i].questionName === req.body.questionName) {
                                levels[i].testCases.push(testcase);
                            }
                        }
                        db_connect.collection("courses").updateOne({"_id": ObjectId(req.body.id), "levels.questionName": req.body.questionName}, {$set: {"levels": levels}}, function (err, response) {
                            if (err) throw err;
                            return res.json(response);
                          });
                    });  
                  }
                  else {
                    return res.json({ message: 'This testcase has already been created!' });
                  }
            })
            .catch((err) => {
                throw err;
            });
        
    }
}