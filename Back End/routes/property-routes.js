const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const PropertyModel = require("../models/PropertyModels");
const cloudinary = require("cloudinary").v2;
// This the route to add a new property
router.post("/add", (req, res) => {
  let newProperty = {
    title: req.body.title,
    description: req.body.description,
    location: req.body.location,
    price: req.body.price,
  };

  // newProperty.owner = req.user._id;
  PropertyModel.findOne({ title: newProperty["title"] })
    .then(async function (dbDocument) {
      // If avatar file is included...
      if (Object.values(req.files).length > 0) {
        const files = Object.values(req.files);

        // upload to Cloudinary
        await cloudinary.uploader.upload(
          files[0].path,
          (cloudinaryErr, cloudinaryResult) => {
            if (cloudinaryErr) {
              console.log(cloudinaryErr);
              res.json({
                status: "not ok",
                message: "Error occured during image upload",
              });
            } else {
              // Include the image url in formData
              newProperty.img = cloudinaryResult.url;
              console.log("newProperty.img", newProperty.img);
            }
          }
        );
      }

      // If email is unique...
      if (!dbDocument) {
        // Create the user's account with hashed password
        PropertyModel.create(newProperty)
          // If successful...
          .then(function (createdDocument) {
            // Express sends this...
            res.json({
              status: "ok",
              createdDocument,
            });
          })
          // If problem occurs, the catch the problem...
          .catch(function (dbError) {
            // For the developer
            console.log("An error occured during .create()", dbError);

            // For the client (frontend app)
            res.status(503).json({
              status: "not ok",
              message: "Something went wrong with db",
            });
          });
      } else {
        // reject the request
        res.status(403).json({
          status: "not ok",
          message: "Property Name already taken!",
        });
      }
    })
    .catch(function (dbError) {
      // For the developer
      console.log("An error occured", dbError);

      // For the client (frontend app)
      res.status(503).json({
        status: "not ok",
        message: "Something went wrong with db",
      });
    });
});

// This the route to show/find a property
router.get("/find", (req, res) => {
  PropertyModel.find({
    // title: req.body.title,
  })
    // .populate(properties)
    .then((dbDocumment) => {
      res.json(dbDocumment);
    })
    .catch((error) => {
      console.log("/find error", error);
      res.send("An error occured");
    });
});

// This the route to Update/Modify a property
router.put("/:id/update", (req, res) => {
  let updatedProperty = {};
  const { id } = req.params;
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

  PropertyModel.findByIdAndUpdate(
    id,
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
router.delete("/:id/delete", (req, res) => {
  const { id } = req.params;
  PropertyModel.findByIdAndDelete(id)
    .then((deletedDocument) => {
      res.json(deletedDocument);
    })
    .catch((error) => {
      console.log("/Properties/delete error", error);
      res.send("An Error Occured!");
    });
});

module.exports = router;
