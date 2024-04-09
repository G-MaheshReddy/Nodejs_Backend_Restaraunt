const mongoose = require("mongoose");

const restarauntSchema = new mongoose.Schema(
  {
    firmname: {
      type: String,
      required: true,
      unique: true,
    },
    area: {
      type: String,
      required: true,
    },
    category: {
      type: [
        {
          type: String,
          enum: ["veg", "non-veg"], //through enum we can give multiple values
        },
      ],
    },
    region: {
      type: [
        {
          type: String,
          enum: ["south-ind", "north-ind", "chinese", "bakery"],
        },
      ],
    },
    offer: {
      type: String,
    },
    image: {
      type: String,
    },

    // firm is related to the vendor,so we have to create relation
    vendor: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Vendor",
      },
    ],
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Firm", restarauntSchema);
