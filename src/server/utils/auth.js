const jwt = require('jsonwebtoken');

const secret = 'mysecretsshhhhh';
const expiration = '2h';

const signToken = function ({ username, email, _id }) {
    const payload = { username, email, _id };

    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
}

const verifyToken = function (token) {
    return jwt.verify(token, secret, { maxAge: expiration });
}

module.exports = { secret, expiration, signToken, verifyToken };