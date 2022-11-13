const { User } = require('./User');

const LocalStrategy = require('passport-local').Strategy;

const intializePassport = (passport) => {

    passport.use(new LocalStrategy(async (username, password, done) => {

        const user = await User.findOne({ username });
        if(!user) return done(null, false);

        if(user.password !== password) return done(null, false);

        return done(null, user);
    }));

    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findById(id);
            return done(null, user)
        } catch(e) {
            return done(e, false)
        }
    });

};

module.exports = {
    intializePassport
}