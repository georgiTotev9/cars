const bcrypt = require('bcrypt');

async function hashPassword(password) {
    return bcrypt.hash(password, 10);
}

async function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
}

// Route Guard
function isLoggedIn() {
    return function (req, res, next) {
        if (req.session.user) {
            next();
        } else {
            res.redirect('/login');
        }
    };
}

module.exports = {
    comparePassword,
    hashPassword,
    isLoggedIn,
};
