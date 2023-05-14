module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },
    registerPost(req, res) {
        console.log(req.body);

        res.redirect('/');
    },
    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },
    loginPost(req, res) {
        res.redirect('/');
    },
    logoutGet(req, res) {},
};
