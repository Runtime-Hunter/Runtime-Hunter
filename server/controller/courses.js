const dbo = require("../db/conn");

module.exports = {
    getCourses: async(res, req) => {
        let db_connect = dbo.getDb("runtime-hunter");
        db_connect.collection("courses")
            .find({}).sort({"name":1}).toArray()
            .then((result) => {
                res.json(result);
            })
            .catch((err) => {
                throw err;
            });
    },
    addCourses: async(res, req) => {
        let db_connect = dbo.getDb("runtime-hunter");
  
        let course = {
            name: req.body.name,
            concept: req.body.concept,
            description: req.body.description,
            levels: req.body.levels,
        };
        // TO-DO
    }
}