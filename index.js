const express = require('express');
const hbs = require('express-handlebars');
const session = require('express-session');

const initDb = require('./models');

const carsService = require('./services/cars');
const authService = require('./services/auth');

const { home } = require('./controllers/home');
const { about } = require('./controllers/about');
const create = require('./controllers/create');
const { details } = require('./controllers/details');
const edit = require('./controllers/edit');
const deleteCar = require('./controllers/delete');
const {
    loginGet,
    loginPost,
    registerGet,
    registerPost,
    logout,
} = require('./controllers/auth');

const { notFound } = require('./controllers/notFound');
const { isLoggedIn } = require('./services/utils');
const { body } = require('express-validator');

start();

async function start() {
    await initDb();

    const app = express();

    app.engine(
        'hbs',
        hbs.create({
            extname: '.hbs',
        }).engine
    );
    app.set('view engine', 'hbs');

    app.use(
        session({
            secret: '123s',
            resave: false,
            saveUninitialized: true,
            cookie: { secure: 'auto' },
        })
    );
    app.use(express.urlencoded({ extended: true }));
    app.use('/static', express.static('static'));
    app.use(carsService());
    app.use(authService());

    app.get('/', home);
    app.get('/about', about);
    app.get('/details/:id', details);
    app.get('/logout', logout);

    app.route('/create')
        .get(isLoggedIn(), create.get)
        .post(isLoggedIn(), create.post);

    app.route('/delete/:id')
        .get(isLoggedIn(), deleteCar.get)
        .post(isLoggedIn(), deleteCar.post);

    app.route('/edit/:id')
        .get(isLoggedIn(), edit.get)
        .post(isLoggedIn(), edit.post);

    app.route('/register')
        .get(registerGet)
        .post(
            body('username')
                .isLength({ min: 3 })
                .withMessage('Username must be at least 3 characters long'),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Password must be at least 5 characters long'),
            body('repeatPassword')
                .custom((value, { req }) => value == req.body.password)
                .withMessage('Passwords do not match'),
            registerPost
        );

    app.route('/login').get(loginGet).post(loginPost);

    app.all('*', notFound);

    app.listen(3000, () => console.log('Server started on port 3000'));
}
