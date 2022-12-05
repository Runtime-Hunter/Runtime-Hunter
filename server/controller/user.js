const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;

module.exports = {
    getFavs: async (req, res) => {
        let db_connect = dbo.getDb("runtime-hunter");

        const users = db_connect.collection('users');

        // Get the user's favorites from the database
        const user = await users.findOne({ _id: userId });

        // Get the details of each favorite item
        const favorites = [];
        for (const favoriteId of user.favorites) {
            const items = db.collection('items');
            const favorite = await items.findOne({ _id: favoriteId });
            favorites.push(favorite);
        }

        return favorites;
    },
    addToFavs: async (req, res) => {
        let db = dbo.getDb("runtime-hunter");

        const users = db.collection('users');

        // Add the item to the user's favorites in the database
        await users.updateOne(
            { _id: userId },
            { $addToSet: { favorites: item } }
        );
    },
    removeFromFavs: async (req, res) => {
        let db = dbo.getDb("runtime-hunter");
        const users = db.collection('users');

        // Remove the item from the user's favorites in the database
        await users.updateOne(
            { _id: userId },
            { $pull: { favorites: item } }
        );
    }
}