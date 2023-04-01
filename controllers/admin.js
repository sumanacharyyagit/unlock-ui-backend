const User = require("../models/user.js");
const Information = require("../models/information.js");
const BigPromise = require("../middlewares/bigPromise.js");
const CustomError = require("../utils/customError.js");

exports.adminGetAllUsers = BigPromise(async (req, res, next) => {
  try {
    const { _id } = req.decodedUser;
    if (!_id) {
      return res.status(200).json({ message: "User information not found!" });
      // return next(new CustomError("User information not found!", 400));
    }

    let userInformation = await Information.find({}).populate("userId");
    if (!userInformation) {
      return res.status(200).json({ message: "User information not found!" });
      // return next(new CustomError("User information not found!", 400));
    }

    return res.status(201).json({
      success: true,
      userInformation,
    });
  } catch (error) {
    console.log(error);
    return next(
      new CustomError("Error occured while fetching user information!", 400)
    );
  }
});

exports.adminGetUserById = BigPromise(async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(200).json({ message: "User id not found!" });
      // return next(new CustomError("User id not found!", 400));
    }

    let userInformation = await Information.findById(id).populate("userId");
    if (!userInformation) {
      return res.status(200).json({ message: "User information not found!" });
      // return next(new CustomError("User information not found!", 400));
    }

    return res.status(201).json({
      success: true,
      userInformation,
    });
  } catch (error) {
    console.log(error);
    return next(
      new CustomError("Error occured while fetching user information!", 400)
    );
  }
});
