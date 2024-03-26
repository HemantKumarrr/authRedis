const User = require("../Models/User.model");
const {
  accessToken,
  accessRefereshToken,
  verifyRefereshToken,
} = require("../helpers/jwt_helper");
const createError = require("http-errors");

module.exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userCreated = await User.create({ email, password });
    const token = accessToken(userCreated._id);
    const refereshToken = accessRefereshToken(userCreated._id);
    res.send({ token, refereshToken });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
module.exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.login(email, password);
    const token = accessToken(user._id);
    const refreshToken = accessRefereshToken(user._id);
    res.send({ token, refreshToken });
  } catch (err) {
    res.send(err.message);
  }
};


module.exports.logout = (req, res) => {
  res.send("logout route");
};


module.exports.refresh_token = async (req, res) => {
  try {
    const { refereshToken } = req.body;
    const verifyToken = await verifyRefereshToken(refereshToken);
    if(!verifyToken) throw createError.Unauthorized();
    const token = await accessToken(verifyToken);
    const refToken = await accessRefereshToken(verifyToken);
    res.send({ token: token, refereshToken: refToken });
  } catch (err) {
    res.send({error : err.message});
  }
};
