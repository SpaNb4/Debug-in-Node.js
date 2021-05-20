const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { SECRET_KEY } = require('./common/config');

module.exports = (req, res, next) => {
    if (req.method == 'OPTIONS') {
        next(); // allowing options as a method for request
    } else {
        const sessionToken = req.headers.authorization;
        if (!sessionToken) {
            return res.status(403).send({ auth: false, message: 'No token provided.' });
        } else {
            jwt.verify(sessionToken, SECRET_KEY, (err, decoded) => {
                if (decoded) {
                    User.findOne({ where: { id: decoded.id } }).then(
                        (user) => {
                            req.user = user;
                            next();
                        },
                        () => {
                            res.status(401).send({ error: 'not authorized' });
                        }
                    );
                } else {
                    res.status(400).send({ error: 'not authorized' });
                }
            });
        }
    }
};
