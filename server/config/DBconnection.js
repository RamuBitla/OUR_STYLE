const mongoose = require('mongoose');

const DBconnection = () => {
    mongoose.connect("mongodb://localhost:27017/OUR-STYLE")
    try {
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error, "couldn't connect to MongoDB");
    }
}

module.exports = DBconnection;
