const { default: mongoose } = require("mongoose");

const databaseConnection = () => {
    mongoose.connect("mongodb+srv://shah:shah123@the-emaily.dehhgj8.mongodb.net/?retryWrites=true&w=majority", () => console.log('Database has connected'));
}

module.exports = {
    databaseConnection
}