const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please provide a product name"],
    },
    price: {
      type: Number,
      required: [true, "Please provide a product price"],
      default: 0,
    },
    design: {
      type: [String],
    },
    style: {
      type: [String],
    },
    description: {
      type: String,
      required: [true, "Please provide a product description"],
    },
    details: {
      type: [String],
      required: true,
    },
    shipping: {
      type: String,
      required: true,
    },
    inventory: {
      type: Number,
      required: true,
      default: 10,
    },
    image: {
      type: [String],
    },
    category: {
      type: String,
      required: [true, "Please provide the product category"],
      enum: ["Stickers & Washi", "Pins", "Original Coasters"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

module.exports = mongoose.model("Product", ProductSchema);
