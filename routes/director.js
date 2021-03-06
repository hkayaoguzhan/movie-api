const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

const Director = require("../models/Director");

//Create New Director
router.post("/new", (req, res, next) => {
  const director = new Director(req.body);
  const promise = director.save();
  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Get Director
router.get("/", (req, res) => {
  const promise = Director.aggregate([
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_id",
        as: "movie"
      }
    },
    {
      $unwind: {
        path: "$movie"
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movie"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ]);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});
// Get Director By ID
router.get("/:director_id", (req, res) => {
  const promise = Director.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    {
      $lookup: {
        from: "movies",
        localField: "_id",
        foreignField: "director_id",
        as: "movie"
      }
    },
    {
      $unwind: {
        path: "$movie"
      }
    },
    {
      $group: {
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio"
        },
        movies: {
          $push: "$movie"
        }
      }
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        movies: "$movies"
      }
    }
  ]);

  promise
    .then(data => {
      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Update Director By ID
router.put("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {
    new: true
  });

  promise
    .then(data => {
      if (!data) next({ message: "The director not found.", code: 99 });

      res.json(data);
    })
    .catch(err => {
      res.json(err);
    });
});

//Delete Director By ID
router.delete("/:director_id", (req, res, next) => {
  const promise = Director.findByIdAndDelete(req.params.director_id);

  promise
    .then(data => {
      if (!data) next({ message: "The director not found.", code: 99 });

      res.json({ status: 200, message: "Veri silindi." });
    })
    .catch(err => {
      res.json(err);
    });
});

module.exports = router;
