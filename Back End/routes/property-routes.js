const express = require("express");
const router = express.Router();
const PropertyModel = require("../models/PropertyModels");

// This the route to add a new property
router.post("/add", (req, res) => {
  let newProperty = {
    title: req.body.title,
    description: req.body.description,
    img: req.body.img,
    location: req.body.location,
    price: req.body.price,
  };

  PropertyModel.create(newProperty)
    .then((dbDocumment) => {
      res.json(dbDocumment);
    })
    .catch((error) => {
      console.log("Add a product Error", error);
      res.send("An Error occurred");
    });
});

// This the route to show/find a property
router.get("/find", (req, res) => {
  PropertyModel
  .find({
    title: req.body.title,
  })
    .then((dbDocumment) => {
      res.json(dbDocumment);
    })
    .catch((error) => {
      console.log("/find error", error);
      res.send("An error occured");
    });
});

// This the route to Update/Modify a property
router.put("/update", (req, res) => {
  let updatedProperty = {};

  if (req.body.title) {
    updatedProperty["title"] = req.body.title;
  }
  if (req.body.description) {
    updatedProperty["description"] = req.body.description;
  }
  if (req.body.img) {
    updatedProperty["img"] = req.body.img;
  }
  if (req.body.location) {
    updatedProperty["location"] = req.body.location;
  }
  if (req.body.price) {
    updatedProperty["price"] = req.body.price;
  }

  PropertyModel
  .findOneAndUpdate(
    {
      title: req.body.title,
    },
    {
      $set: updatedProperty,
    },
    {
      new: true,
    }
    )
    .then((dbDocumment) => {
      res.json(dbDocumment);
    })
    .catch((error) => {
      console.log("/Properties/update error", error);
      res.send("An Error Occured!");
    });
});

// This the route to delete a property
router.delete("/delete", (req, res) => {
  PropertyModel
    .findOneAndDelete({ title: req.body.title })
    .then((deletedDocument) => {
      res.json(deletedDocument);
    })
    .catch((error) => {
      console.log("/Properties/delete error", error);
      res.send("An Error Occured!");
    });
});

module.exports = router;