const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET_AJWTUVf4WKZhKmxskKSqPKIBbOimeMeQgdgqE89TfyTD1Cq1zehzWLjCt9EbuArKHoFmlVCIWvvXwlhwaBadLoqMxKslcGLrwaIeHdLh8YozEGB6HKhdjVFHLXdkAw3Q6j9rRZ9FF395skFIGMTkV82m3RykHlkWav5rSXjLGyP2CFBmYDWLiKvLShjl7stlpJGU3fZbyb4xDfG6f2bd3Qx4W3JS4R4Ox1w7lHAvb64xvoMrG386z7Y8VB');
        const userId = decodedToken.userId;
        req.auth = {
            userId: userId
        };
    next();
    } catch(error) {
        res.status(401).json({error});
    }

};