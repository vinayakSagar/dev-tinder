const mongoose = require("mongoose");

const connectDB = async () => {
  return await mongoose.connect(
    "mongodb+srv://vinayaksagar444:movPUVZwWWKvz5BX@cluster7.m9b82pg.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
