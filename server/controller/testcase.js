import { getDb } from "../db/conn.js";
import { ObjectId } from "mongodb";

export async function getTestcases(req, res) {
    let db_connect = getDb("runtime-hunter");

    db_connect.collection("courses")
        .findOne({ "_id": ObjectId(req.params.courseId), "levels.levelId": (req.params.levelId) })
        .then((result) => {
            var levels = result.levels;
            for (let i = 0; i < levels.length; i++) {
                if (levels[i].levelId.toString() === req.params.levelId) {
                    return res.json(levels[i].testCases);
                }
            }
        })
        .catch((err) => {
            throw err;
        });
}
export async function getTestcase(req, res) {
    let db_connect = getDb("runtime-hunter");

    db_connect.collection("courses")
        .findOne({ "_id": ObjectId(req.params.courseId), "levels.testCases.testcaseId": ObjectId(req.params.testcaseId) })
        .then((result) => {

            var levels = result.levels;
            for (let i = 0; i < levels.length; i++) {
                let testcases = levels[i].testCases;
                for (let j = 0; j < testcases.length; j++) {
                    let testcase = testcases[j];
                    if (testcase.testcaseId.toString() === req.params.testcaseId) {
                        return res.json(testcase);
                    }
                }
            }
        })
        .catch((err) => {
            throw err;
        });
}

export async function updateTestcase(req, res) {
    let db_connect = getDb("runtime-hunter");

    let newTestcase = {
        testcaseId: ObjectId(req.params.testcaseId),
        input: req.body.input,
        output: req.body.output,
        timeLimit: req.body.timeLimit,
    };

    db_connect.collection("courses")
        .findOne({
            "_id": ObjectId(req.params.courseId),
            "levels.levelId": req.params.levelId,
            "levels.testCases.testcaseId": ObjectId(req.params.testcaseId),
        })
        .then((result) => {

            var levels = result.levels;
            for (let i = 0; i < levels.length; i++) {
                let testcases = levels[i].testCases;
                for (let j = 0; j < testcases.length; j++) {
                    let testcase = testcases[j];
                    if (testcase.testcaseId.toString() === req.params.testcaseId) {
                        levels[i].testCases[j] = newTestcase;
                    }
                }
            }
            
            db_connect.collection("courses").updateOne({ "_id": ObjectId(req.params.courseId), "levels.levelId": (req.params.levelId) }, { $set: { "levels": levels } }, function (err, response) {
                if (err)
                    throw err;
                return res.json({ message: 'Updated test case succesfully' });
            });
        })
        .catch((err) => {
            throw err;
        });
}

export async function deleteTestcase(req, res) {
    let db_connect = getDb("runtime-hunter");
    
    db_connect.collection("courses")
        .updateOne({
            "_id": ObjectId(req.params.courseId),
            "levels.levelId": req.params.levelId,
            "levels.testCases.testcaseId": ObjectId(req.params.testcaseId),
        }, {$pull: { "levels.$.testCases": { "testcaseId": ObjectId(req.params.testcaseId) } } },  
           {multi: true} )
        .then((result) => {
            return res.json({ message: 'Deleted testcase succesfully' });
        })
        .catch((err) => {
            console.log("err: ", err);
            throw err;
        });

}


export async function addTestcase(req, res) {
    let db_connect = getDb("runtime-hunter");

    let testcase = {
        testcaseId: ObjectId(),
        input: req.body.input,
        output: req.body.output,
        timeLimit: req.body.timeLimit,
    };

    db_connect.collection("courses")
        .findOne({
            "_id": ObjectId(req.params.courseId),
            "levels.levelId": req.params.levelId,
            "levels.testCases.input": req.body.input,
            "levels.testCases.output": req.body.output,

        })
        .then((result) => {
            if (!result) {
                db_connect.collection("courses").findOne({
                    "_id": ObjectId(req.params.courseId), "levels.levelId": { $eq: (req.params.levelId) }
                }, function (req1, res1) {
                    var levels = res1.levels;
                    for (let i = 0; i < levels.length; i++) {
                        if (levels[i].levelId.toString() == req.params.levelId) {
                            levels[i].testCases.push(testcase);
                        }
                    }
                    db_connect.collection("courses").updateOne({ "_id": ObjectId(req.params.courseId), "levels.levelId": (req.params.levelId) }, { $set: { "levels": levels } }, function (err, response) {
                        if (err)
                            throw err;
                        return res.json({ message: 'Created test case succesfully' });
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