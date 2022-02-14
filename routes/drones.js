const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
    Drone.find()
    .then((allDrones) => {
        console.log(allDrones);
        res.render('drones/list.hbs', {drones: allDrones})
    })
    .catch((err) => {
        console.log(err);
    })
});

router.get('/drones/create', (req, res, next) => {
  res.render('drones/create-form.hbs');
});

router.post('/drones/create', (req, res, next) => {
  const {name, propellers, maxSpeed} = req.body;
  Drone.create({name, propellers, maxSpeed})
  .then((createdDrone) => {
      console.log ('Drone created', createdDrone.name);
      res.redirect('/drones');
  })
  .catch((err) => next(err))
});

router.get('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params;
    Drone.findById(id)
    .then((founDrone) => {
      console.log(founDrone)
        res.render('drones/update-form.hbs', {drones: founDrone});
    })
    .catch((err) => {
        next(err)
    })
});

router.post('/drones/:id/edit', (req, res, next) => {
  const {id} = req.params;
  const {name, propellers, maxSpeed} = req.body;
  Drone.findByIdAndUpdate(id, {name, propellers, maxSpeed})
  .then((updateDrone) => {
    res.redirect(`/drones`);
  })
  .catch((err) => next(err))

});

router.post('/drones/:id/delete', (req, res, next) => {
  const {id} = req.params;

    Drone.findByIdAndDelete(id)
    .then(() => {
        res.redirect("/drones");
    })
    .catch((err) => {
        next(err)
    })
});

module.exports = router;
