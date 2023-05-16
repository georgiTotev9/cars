module.exports = {
    registerGet(req, res) {
        res.render('register', { title: 'Register' });
    },
    async registerPost(req, res) {
        if (req.body.username == '' || req.body.password == '')
            return res.render('/register');
        if (req.body.password != req.body.repeatPassword)
            return res.render('/register');

        try {
            await req.auth.register(req.body.username, req.body.password);
            res.redirect('/');
        } catch (err) {
            console.error(err);
            return res.redirect('/register');
        }
    },
    loginGet(req, res) {
        res.render('login', { title: 'Login' });
    },
    loginPost(req, res) {
        res.redirect('/');
    },
    logoutGet(req, res) {},
};