import mongoose from "mongoose";

const fleetsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    seats: {
      type: Number,
      required: true,
    },
    fuel: {
      type: String,
      required: true,
    },
    speed: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    features: {
      type: [String],
      required: true,
    },

    specs: {
      engine: {
        type: String,
        required: true,
      },
      transmission: {
        type: String,
        required: true,
      },
      horsepower: {
        type: String,
        required: true,
      },
      acceleration: {
        type: String,
        required: true,
      },
      fuelEconomy: {
        type: String,
        required: true,
      },
      trunk: {
        type: String,
        required: true,
      },
    },
  },
  { timestamps: true },
);

const Fleets =
  mongoose.models.Fleets || mongoose.model("Fleets", fleetsSchema, "Fleets");

export default Fleets;
