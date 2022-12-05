import { getDb } from "../db/conn.js";
import { ObjectId } from "mongodb";

export async function getFavs(req, res) {
    let db = getDb("runtime-hunter");

    const users = db.collection('users');

    // Get the user's favorites from the database
    const user = await users.findOne({ _id: ObjectId(req.body.userId) });
    // Get the details of each favorite item
    const favorites = [];
    for (const favoriteId of user.favorites) {
        const courses = db.collection('courses');
        const favorite = await courses.findOne({ _id: favoriteId });
        favorites.push(favorite);
    }

    return res.json(favorites);
}
export async function addToFavs(req, res) {
    let db = getDb("runtime-hunter");

    const users = db.collection('users');

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
    await users.updateOne(
        { _id: userId },
        { $pull: { favorites: ObjectId(req.body.courseId) } }
    );
    res.status(204).send();
}
