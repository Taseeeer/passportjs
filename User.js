const { default: mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: String,
    username: {
        type: String,
        unique: true
    },
    password: String
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}