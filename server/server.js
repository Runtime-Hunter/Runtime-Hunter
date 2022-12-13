import "dotenv/config.js";
import express, { json, static as _static } from "express";
const app = express();

import cors from "cors";
import path from "path";

const port = process.env.PORT || 4800;
import userRouter from "./routes/user.js";
import levelsRouter from "./routes/level.js";
import coursesRouter from "./routes/courses.js";
import testcasesRouter from "./routes/testcase.js";
import submissionsRouter from "./routes/submission.js";

app.use(cors({ origin: "*", methods: "*" }));
app.use(json());

app.use("/", userRouter);
app.use("/", levelsRouter);
app.use("/", coursesRouter);
app.use("/", testcasesRouter);
app.use("/", submissionsRouter);

import { connectToServer } from "./db/conn.js";

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  app.use(_static('../client/build'));

  // Express serve up index.html file if it doesn't recognize route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'client', 'build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server will start on port: ${port}`)
  // perform a database connection when server starts
  connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});