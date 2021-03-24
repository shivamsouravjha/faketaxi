const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require("path");

const rider_router = require('./Routes/rider_router');
const driver_router = require('./ROUTEs/driver_router');
const booking_routers = require('./ROUTEs/booking_routers');
const Erur = require('./MODEL/Error');

const app = express();
app.use(bodyParser.json());

app.use('/api/rider', rider_router); // => /api/places...
app.use('/api/driver', driver_router);
app.use('/api/booking/', booking_routers);

if(process.env.NODE_ENV==="production"){
  app.use(express.static(path.join(__dirname,"frontend/build")));
}
  app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
  });
 
  mongoose
  .connect(
    `mongodb://${process.env.name}:${process.env.password}@cluster0-shard-00-00.dm1xw.mongodb.net:27017,cluster0-shard-00-01.dm1xw.mongodb.net:27017,cluster0-shard-00-02.dm1xw.mongodb.net:27017/${process.env.db}?ssl=true&replicaSet=atlas-x6eag6-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true }
  )
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch(err => {
    console.log(err);
  });
