const mongoose = require("mongoose");
require("dotenv").config();
const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((data) => {
      console.log(`Mongod connected with server:${data.connection.host}`);
      //   console.log(data);
    })
    .catch((err) => {
      console.log("Mongod Failed to connection" + err);
    });
};
module.exports = connectDatabase;
