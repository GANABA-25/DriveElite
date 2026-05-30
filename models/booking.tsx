import mongoose, { Schema, models, model } from "mongoose";

const bookingSchema = new Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },

    phoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    ghanaCard: {
      type: String,
      required: true,
      trim: true,
    },

    driverLicense: {
      type: String,
      required: true,
      trim: true,
    },

    fleetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Fleet",
      required: true,
    },

    pickupDate: {
      type: Date,
      required: true,
    },

    returnDate: {
      type: Date,
      required: true,
    },

    pickupTime: {
      type: String,
      required: true,
    },

    returnTime: {
      type: String,
      required: true,
    },

    pickupLocation: {
      type: String,
      required: true,
      trim: true,
    },

    returnLocation: {
      type: String,
      required: true,
      trim: true,
    },

    extras: {
      gps: {
        type: Boolean,
        default: false,
      },

      childSeat: {
        type: Boolean,
        default: false,
      },

      additionalDriver: {
        type: Boolean,
        default: false,
      },

      fullInsurance: {
        type: Boolean,
        default: false,
      },
    },

    totalDays: {
      type: Number,
      required: true,
    },

    dailyRate: {
      type: Number,
      required: true,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["mobile_money", "card"],
    },

    paymentProvider: {
      type: String,
      enum: ["MTN", "Telecel", "AirtelTigo", "Paystack", "Flutterwave"],
    },

    paymentReference: {
      type: String,
      default: null,
    },

    transactionId: {
      type: String,
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },

    bookingReference: {
      type: String,
      unique: true,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Booking = models.Booking || model("Booking", bookingSchema);

export default Booking;
