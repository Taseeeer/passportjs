const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const expressSession = require('express-session');

const { databaseConnection } = require('./dbConnection');
const { intializePassport } = require('./passport');
const { User } = require('./User');

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(expressSession({ secret: "mysecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session())

databaseConnection();

intializePassport(passport);

app.get('/', (req, res) => {
    res.send("Hello node");
});

app.get('/users', async (req, res) => {
    const users = await User.find();
    return res.send(users);
});

app.post('/register', async (req, res) => {
    const { username} = req.body;
    const user = await User.findOne({ username: username });
    if(user) return res.send('User exists already!');
    const newUser = User.create(req.body);
    return res.send(newUser);
});

app.post('/login', passport.authenticate('local', { failureRedirect: '/' }), (req, res) => {
    res.send("You've logged in successfully!");
})

app.delete('/user/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findByIdAndRemove(id);
    return res.send(user);
});


app.listen(3000, () => console.log("Server has started"));