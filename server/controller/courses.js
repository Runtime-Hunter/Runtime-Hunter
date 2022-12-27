import { ObjectId } from "mongodb";
import { getDb } from "../db/conn.js";

export async function getCourses(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("courses")
        .find({}).sort({ "name": 1 }).toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function getCourse(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("courses")
        .findOne({ "_id": ObjectId(req.params.courseId) })
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            throw err;
        });
}
export async function getUserCourses(req, res) {
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("courses")
        .find({ "creatorId": req.params.userId }).toArray()
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.log(err);
            throw err;
        });
}
export async function addCourse(req, res) {
    let db_connect = getDb("runtime-hunter");
    let course = {
        courseName: req.body.courseName,
        concept: req.body.concept,
        description: req.body.description,
        levels: req.body.levels,
        creatorId: req.body.creatorId,
    };

    db_connect.collection("courses").findOne({ "courseName": req.body.courseName, "concept": req.body.concept })
        .then(result => {
            if (!result) {
                db_connect.collection("courses").insertOne(course, function (err, response) {
                    if (err)
                        throw err;
                    return res.json(response);
                });
            }
            else {
                return res.json({ message: 'This course has already been created!' });
            }
        });
}

export async function deleteCourse(req, res){
    console.log(req.body.courseId)
    let db_connect = getDb("runtime-hunter");
    db_connect.collection("courses")
    .deleteOne({ "_id": ObjectId(req.body.courseId) })
    .then(result => {
        return res.json({ message: 'Successfully deleted course' })
    })
    .catch(err => {
        return err;
    })
}


export async function updateCourse(req, res){
    let db_connect = getDb("runtime-hunter");
    // create a filter 
    const filter = { "_id": ObjectId(req.body.courseId) };

    // this option instructs the method to create a document if no documents match the filter
    const options = { upsert: false };

    // create a document 
    const updateDoc = {
        $set: {
            courseName: req.body.courseName,
            description: req.body.description
        },

    };
 console.log("here", updateDoc)
    db_connect.collection("courses")
    .updateOne(filter, updateDoc, options)
    .then(result => {
        return res.json({ message: 'Successfully updated course' })
    })
    .catch(err => {
        return err;
    })
}
