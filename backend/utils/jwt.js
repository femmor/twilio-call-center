const jwt = require('jsonwebtoken');

function createJwt(username) {
  const token = jwt.sign({ username }, process.env.JWT_SECRET);
  return token;
}

function verifyToken(token) {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
}

module.exports = {
  createJwt,
  verifyToken,
};
