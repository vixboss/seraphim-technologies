// FORMAT OF TOKEN
// Authorization: Bearer <access_token>
const JWT = require('jsonwebtoken');

function verifyToken(req, res, next) {
    // Check headers for Authorization key.
    if(!req.headers['authorization']) return next(res.status(403).send('Not Authorized.'))
    // Get auth header value.
    const bearerHeader = req.headers['authorization'];
    // Check if bearer is not undefined.    
    if(typeof bearerHeader !== "undefined"){
        // Split with space and get token
        const bearerToken = bearerHeader.split(' ')[1];
        // JWT Verification
        JWT.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET, (err, payload) => {
            if(err) return next(res.status(403).send('Not Authorized.'));
            req.payload = payload;
            next();
        });
    }
    else{
        // Forbidden
        res.status(403).send('Not Authorized.');
    }
}

module.exports = verifyToken;