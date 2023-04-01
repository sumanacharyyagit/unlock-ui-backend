const { Schema, model } = require("mongoose");

const informationSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    currentDate: {
      type: String,
      required: [true, "Please provide a currentDate"],
    },
    weightUnit: {
      type: String,
      required: [true, "Please provide an weightUnit"],
      enum: {
        values: ["kg", "lbs"],
        message: "Please provide product category only from --> kg, lbs",
      },
    },
    currentWeight: {
      type: Number,
      required: [true, "Please provide currentWeight"],
    },
    idealWeight: {
      type: Number,
      required: [true, "Please provide idealWeight"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Information", informationSchema);
