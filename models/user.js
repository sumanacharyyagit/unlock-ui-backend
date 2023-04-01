const { Schema, model } = require("mongoose");
// import validator from "validator";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// import crypto from "crypto";

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Please provide a fullName"],
      maxLength: [40, "fullName should under 40 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8, "Password must be at least 8 characters"],
      select: false,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

// // Excrypt the password before Save --- Hooks
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

// Validate the password with passed on user password
userSchema.methods.isPasswordValidated = async function (sentUserPassword) {
  return await bcrypt.compare(sentUserPassword, this.password);
};

// Create and Return JWT Token
userSchema.methods.getJWTToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, role: this.role },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60 * 1000,
    }
  );
};

// // Generate Forgot Password Token
// userSchema.methods.getForgotPasswordToken = function () {
//   // Generate a random long string value
//   const forgotPwdToken = crypto.randomBytes(20).toString("hex");

//   // Getting Hash for forgotPwdToken into DB - ** TODO: Make sure to get a hash on backend
//   this.forgotPasswordToken = crypto
//     .createHash("sha256")
//     .update(forgotPwdToken)
//     .digest("hex");

//   // Time for exoiration of token
//   this.forgotPasswordExpiry =
//     Date.now() + process.env.FORGOT_PASSWORD_EXPIRY * 60 * 1000;

//   return forgotPwdToken;
// };

module.exports = model("User", userSchema);
