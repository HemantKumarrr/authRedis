const express = require("express");
const createErrors = require("http-errors");
const AuthRouter = require("./Routers/Auth.router");
const { verifyAccessToken } = require('./helpers/jwt_helper');
const connectDB = require('./Config/mongoDB')
require('./helpers/init_redis')
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes
app.use('/auth', AuthRouter);

app.get("/",verifyAccessToken, (req, res) => {
  res.send("welcome to express application");
});

// Http error handlers
app.use(async (req, res, next) => {
  next(createErrors.NotFound());
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: { status: err.status || 500, message: err.message } });
});

app.listen(PORT, () => {
  console.log("running on PORT : ", PORT);
});
