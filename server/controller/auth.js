import pkg from "bcryptjs";
const { compare, hash } = pkg;
import { getDb } from "../db/conn.js";


export async function signup(req, response) {
    let db_connect = getDb("runtime-hunter");

    let user = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,
        userType: 1,
        gamesBeingPlayed: [],
    };

    // hashing time
    const saltRounds = 10;

    // encrypting the password
    genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
            return saltError;
        } else {
            hash(req.body.password, salt, function (hashError, _hash) {
                if (hashError) {
                    return hashError;
                }

                user.password = _hash;

                // inserting to users collection after hashing
                db_connect.collection("users").find({ "email": req.body.email }).toArray()
                    .then((result) => {
                        if (result.length === 0) {
                            db_connect.collection("users").insertOne(user, function (err, res) {
                                if (err)
                                    throw err;
                                return response.json(res);
                            });
                        }
                        else {
                            return response.json({ message: 'This email has already been used!' });
                        }
                    });
            });
        }
    });

}
export async function login(req, res) {
    let db_connect = getDb("runtime-hunter");
    let myquery = { "email": req.params.email };
    let currUser = req.body.data.user;
    db_connect
        .collection("users")
        .findOne(myquery, async (err, result) => {
            if (err)
                console.log(err.message);

            if (result) {
                const validPassword = await compare(currUser.password, result.password);
                if (validPassword) {
                    return res.status(200).json(result);
                } else {
                    return res.status(200).json({ message: "Invalid Password" });
                }
            }
            else {
                return res.status(200).json({ message: "Invalid E-mail" });
            }
        });
}
export function getCorrectlySolvedQuestions(req, res) {
    let userId = req.params.userId;

    db_connect.collection("users").findOne();
}