const { SignJWT, jwtVerify } = require('jose');

const secret = new TextEncoder().encode(
    'cc7e0d44fd473002f1c42167459001140ec6389b7353f8088f4d9a95f2f596f2',
)
const expiration = '2h';
const alg = 'HS256';

const signToken = async function ({ username, email, _id }) { // 
    try {
        const token = await new SignJWT({ username, email, _id  })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer('thebestTAever')
            .setAudience('thebestSTUDENTSever')
            .setExpirationTime(expiration)
            .sign(secret);

        return token;
    } catch (error) {
        console.log("Signtoken error: ", error);

        return null;
    }
}

const verifyToken = async function (token) {
    try {
        const { payload } = await jwtVerify(token, secret, { issuer: 'thebestTAever', audience: 'thebestSTUDENTSever' });

        return payload;
    } catch (error) {
        console.log("Verification token error: ", error);

        return null;
    }
}

module.exports = { secret, expiration, signToken, verifyToken };