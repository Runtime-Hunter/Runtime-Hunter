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
        status: req.body.testcases.map(x => x.status).every(Boolean),
        testcases: req.body.testcases,
        language: req.body.language.label,
    };

    const submissionRes = await db_connect.collection("submissions").insertOne(submission);
    const userRes = await db_connect.collection("users").updateOne(
        { "_id": ObjectId(req.body.userId) },
        { $addToSet: { gamesBeingPlayed: req.body.courseId }, }
    );

    if (submission.status)
        await db_connect.collection("users").updateOne(
            { "_id": ObjectId(req.body.userId) },
            { $addToSet: { correctlySolvedQuestions: req.body.levelId }, }
        );
    return res.json(submissionRes);
}