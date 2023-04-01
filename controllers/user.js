const User = require("../models/user.js");
const Information = require("../models/information.js");
const BigPromise = require("../middlewares/bigPromise.js");
const CustomError = require("../utils/customError.js");

exports.signUser = BigPromise(async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(
        new CustomError("Name, Email and Password are required", 400)
      );
    }

    let user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      user = await User.create({
        fullName,
        email,
        password,
      });
    } else {
      const isCorrectPassword = await user.isPasswordValidated(password);
      if (!isCorrectPassword) {
        return next(new CustomError("Email or Password not matched!", 400));
      }
    }

    const token = user.getJWTToken();

    return res.status(201).json({
      success: true,
      token,
      user: {
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError("Error occured while create user!", 400));
  }
});

exports.getSpecificUser = BigPromise(async (req, res, next) => {
  try {
    const { _id } = req.decodedUser;
    if (!_id) {
      return next(new CustomError("User not found!", 400));
    }

    let user = await User.findById(_id);
    if (!user) {
      return res.status(200).json({ message: "User not found!" });
      // return next(new CustomError("User not found!", 400));
    }

    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return next(new CustomError("Error occured while fetching user!", 400));
  }
});

exports.logOut = BigPromise(async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "Successfully logged out!",
  });
});

exports.createUpdateWeightInformation = BigPromise(async (req, res, next) => {
  try {
    const { _id } = req.decodedUser;
    if (!_id) {
      return next(new CustomError("User not found!", 400));
    }
    const { currentDate, weightUnit, idealWeight, currentWeight } = req.body;
    if (!currentDate || !weightUnit || !idealWeight || !currentWeight) {
      return next(
        new CustomError(
          "currentDate, weightUnit, idealWeight and currentWeight are required",
          400
        )
      );
    }

    let information = await Information.findOne({ userId: _id });
    if (!information) {
      information = await Information.create({
        userId: _id,
        currentDate,
        weightUnit: weightUnit,
        idealWeight: Number(idealWeight),
        currentWeight: Number(currentWeight),
      });
    } else {
      information = await Information.findByIdAndUpdate(information._id, {
        userId: _id,
        currentDate,
        weightUnit: weightUnit,
        idealWeight: Number(idealWeight),
        currentWeight: Number(currentWeight),
      });
    }

    return res.status(201).json({
      success: true,
      information,
    });
  } catch (error) {
    console.log(error);
    return next(
      new CustomError("Error occured while create user information!", 400)
    );
  }
});

exports.getWeightInformation = BigPromise(async (req, res, next) => {
  try {
    const { _id } = req.decodedUser;
    if (!_id) {
      return next(new CustomError("User not found!", 400));
    }

    let information = await Information.findOne({ userId: _id });
    if (!information) {
      return res.status(200).json({ message: "No weight information found!" });
      // return next(new CustomError("No weight information found!", 400));
    }

    return res.status(201).json({
      success: true,
      information,
    });
  } catch (error) {
    console.log(error);
    return next(
      new CustomError("Error occured while get user information!", 400)
    );
  }
});
