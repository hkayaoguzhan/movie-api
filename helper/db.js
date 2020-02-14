const mongoose = require("mongoose");
const url = "mongodb+srv://root:123@movie-api-vi9wz.mongodb.net/test?retryWrites=true&w=majority"

module.exports = () => {
  mongoose.connect(url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  );
  mongoose.connection.on("open", () => {
    console.log("MongoDb is Connected");
  });
  mongoose.connection.on("error", err => {
    console.log("MongoDb Err", err);
  });
  mongoose.Promise = global.Promise;
};
