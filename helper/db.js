const mongoose = require('mongoose');

module.exports = () => {
    mongoose.connect('mongodb+srv://root:123@movie-api-vi9wz.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.connection.on('open', () => {
        console.log('MOngoDb Connected')
    });
    mongoose.connection.on('error', (err) => {
        console.log('MOngoDb Err', err);
    });
    mongoose.Promise = global.Promise;
}