import { getDb } from "../db/conn.js";
import { ObjectId } from "mongodb";

export async function getFavs(req, res) {
    let db = getDb("runtime-hunter");

    const users = db.collection('users');
    // Get the user's favorites from the database
    const user = await users.findOne({ _id: ObjectId(req.query.userId) });
    if (user == null) return res.status(400).send()
    // Get the details of each favorite item
    const courses = db.collection('courses');
    const favorites = await courses.find({ _id: { $in: user.favorites } }).toArray();

    return res.json(favorites);
}
export async function addToFavs(req, res) {
    let db = getDb("runtime-hunter");

    const users = db.collection('users');
    console.log(req.body)
    // Add the item to the user's favorites in the database
    const newFavorite = await users.updateOne(
        { _id: ObjectId(req.body.userId) },
        { $addToSet: { favorites: ObjectId(req.body.courseId) } }
    );
    res.status(200).send();
}
export async function removeFromFavs(req, res) {
    let db = getDb("runtime-hunter");
    const users = db.collection('users');

    // Remove the item from the user's favorites in the database
    const r = await users.updateOne(
        { _id: ObjectId(req.body.userId) },
        { $pull: { favorites: ObjectId(req.body.courseId) } }
    );
    res.status(204).send();
}
