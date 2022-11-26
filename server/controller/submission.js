import { getDb } from "../db/conn.js";
import { ObjectId } from "mongodb";

export async function getSubmissions(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("submissions")
        .find({}).toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function getSubmission(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("submissions")
        .findOne({ "_id": ObjectId(req.params.id) })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function getUserQuestionSubmission(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("submissions")
        .find({ "userId": req.body.userId, "levelId": req.body.levelId }).toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function getUserSubmissions(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("submissions")
        .find({ "userId": req.body.userId }).toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function addSubmission(req, res) {
    let db_connect = getDb("runtime-hunter");

    let submission = {
        submissionId: ObjectId(),
        userId: req.body.userId,
        courseId: req.body.courseId,
        levelId: req.body.levelId,
        timeSubmitted: req.body.timeSubmitted,
        status: req.body.status,
        runtime: req.body.runtime,
        language: req.body.language,
    };

    db_connect.collection("submissions").insertOne(submission, function (err, response) {
        if (err)
            throw err;
        db_connect.collection("users")
            .findOne({
                "_id": ObjectId(req.body.userId),
            })
            .then(user => {
                var gamesPlayed = user.gamesBeingPlayed ?? [];
                if (!gamesPlayed.includes(req.body.courseId)) {
                    gamesPlayed.push(req.body.courseId);

                    db_connect.collection("users")
                        .updateOne({
                            "_id": ObjectId(req.body.userId),
                        }, { $set: { "gamesBeingPlayed": gamesPlayed } })
                        .then(result => {
                        })
                        .catch(err => {
                            throw err;
                        });

                }
                console.log("status: ", req.body.status);
                if (req.body.status === true) {

                    db_connect.collection("users")
                        .findOne({
                            "_id": ObjectId(req.body.userId),
                            "correctlySolvedQuestions.levelId": ObjectId(req.body.levelId)
                        })
                        .then(result => {
                            if (!result) {
                                db_connect.collection("users").findOne({ "_id": ObjectId(req.body.userId) }, function (req1, res1) {
                                    var correctlySolvedQuestions = res1.correctlySolvedQuestions ? res1.correctlySolvedQuestions : [];
                                    correctlySolvedQuestions.push(ObjectId(req.body.levelId));
                                    db_connect.collection("users").updateOne({ "_id": ObjectId(req.body.userId) }, { $set: { "correctlySolvedQuestions": correctlySolvedQuestions } }, function (err, response) {
                                        if (err)
                                            throw err;
                                        return res.json(response);
                                    });

                                });
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                }
            });
        return res.json(response);
    });


}