module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },
    registerPost(req, res) {},
    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },
    loginPost(req, res) {},
    logoutGet(req, res) {},
};
