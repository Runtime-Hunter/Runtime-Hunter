const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const registrationRouter = require("./routes/registration");
const levelsRouter = require("./routes/level");
const coursesRouter = require("./routes/courses");

app.use(cors({origin: "*", methods: "*"}));
app.use(express.json());

app.use("/", registrationRouter);
app.use("/", levelsRouter);
app.use("/", coursesRouter);
const dbo = require("./db/conn");

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(express.static('../client/build'));

  // Express serve up index.html file if it doesn't recognize route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..','client', 'build', 'index.html'));
  });
}
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});