// Iteration #1
const drones = [
    {
        name: "General Atomics",
        propellers: 4, 
        maxSpeed: 19
    }, 
    {
        name: "MQ-9",
        propellers: 6,
        maxSpeed: 17
    },
    {
        name: "Reaper",
        propellers: 3,
        maxSpeed: 15
    }
]

const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');

const MONGO_URI = process.env.MONGODB_URI || "mongodb://localhost/lab-express-drones";

mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

  Drone.create(drones)
  .then((dronesFromDb) => {
      console.log(`Created ${dronesFromDb.length} drones`)
      mongoose.disconnect(() =>
          console.log('Connection closed'))
  }) .catch((err) => console.log(err))