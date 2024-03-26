const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const client = require('../helpers/init_redis')

module.exports = {
    accessToken : (userId)=> {
        return jwt.sign({ userId, audience: userId },'secret key Hemant' , { expiresIn: '25s' });
    },
    verifyAccessToken :  (req, res, next)=> {
        if(!req.headers['authorization']) return next(createError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const baererToken = authHeader.split(' ');
        const token = baererToken[1];
        jwt.verify(token, 'secret key Hemant', (err, decodedToken)=> {
            if(err) {
                const message = err.name === 'JsonWebTokenError' ? "Unauthorized" : err.message
                return next(createError.Unauthorized(message));
            }
            next();
        })

    },
    accessRefereshToken : (userId)=> {
        const token = jwt.sign({ userId, audience: userId },'secret key 02 Hemant' , { expiresIn: '1y' });
        client.SET(`${userId}`, token, 'EX', 365 * 24 * 60 * 60);
        return token
    },
    verifyRefereshToken: (refreshToken)=> {
        return jwt.verify(refreshToken, 'secret key 02 Hemant', async (err, payload)=> {
            if(err) throw createError.Unauthorized()
            const userId = payload.userId
            const value = await client.GET(userId);
            if(refreshToken === value) return userId;
            createError.Unauthorized()
        })
    }
}