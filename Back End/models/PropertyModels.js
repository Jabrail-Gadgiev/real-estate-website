const mongoose = require('mongoose');

const PropertySchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        img: {
            type: String,
            required: true
        },
        location: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        dateCreated: {
            type: Date,
            required: true,
            default: Date.now
        }
    }
)

const PropertyModel = mongoose.model('properties', PropertySchema);

module.exports = PropertyModel;