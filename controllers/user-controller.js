const userServices = require("../Services/user-services");
const CustomErrorHandler = require("../ErrorHandler/CustomErrorHandler");
const User = require("../models/User");
const UserDto = require("../Dtos/user-dto");
const passwordServices = require("../Services/password-services");

class UserController {
  // UPDATE USER DATA
  async updateUser(req, res, next) {
    const id = req.id;
    try {
      const user = await userServices.findUser({ _id: id });
      if (!user) {
        return res.status(401).json(CustomErrorHandler.notAllowed());
      }
      await userServices.updateUser({ $set: req.body });
      return res.status(200).json({ message: "wow!! user has been updated" });
    } catch (error) {
      next(error);
    }
  }

  // GET ALL USER
  async getUsers(req, res, next) {
    try {
      if (req.isAdmin === true) {
        const user = await User.find().sort({ _id: -1 });
        let userDtos = user.map((u) => {
          return new UserDto(u);
        });
        return res.status(200).json(userDtos);
      } else {
        return res.status(401).json(CustomErrorHandler.unAuthorized());
      }
    } catch (error) {
      next(error);
    }
  }
  // GET USER
  async getUser(req, res, next) {
    try {
      if (req.isAdmin === true) {
        const user = await User.findOne({ _id: req.params.id }).sort({
          _id: -1,
        });
        const userDtos = new UserDto(user);
        return res.status(200).json(userDtos);
      } else {
        return res.status(401).json(CustomErrorHandler.unAuthorized());
      }
    } catch (error) {
      next(error);
    }
  }
  // DELETE USER
  async removeUser(req, res, next) {
    try {
      if (req.isAdmin === true) {
        const user = await userServices.findUser({ _id: req.params.id });
        if (user) {
          await User.deleteOne({ _id: user.id });
          return res
            .status(200)
            .json({ message: "User successfully removed!!" });
        } else {
          return res.status(400).json({ message: "User not found!!" });
        }
      } else {
        return res.status(401).json(CustomErrorHandler.unAuthorized());
      }
    } catch (error) {
      next(error);
    }
  }
  // RESET PASSWORD
  async resetPassword(req, res, next) {
    const { password, newPassword } = req.body;
    try {
      if (req.id) {
        const user = await userServices.findUser({ _id: req.params.id });
        if (!user) {
          return res.status(400).json({ message: "User not found!!" });
        }
        const verifyPassword = await passwordServices.verifyPass(
          password,
          user.password
        );
        // console.log(user);

        if (verifyPassword) {
          const hashThePassword = await passwordServices.hashPass(newPassword);
          await userServices.updateUser({ password: hashThePassword });

          return res.status(200).json({ message: "Password has been changed" });
        } else {
          return res.status(400).json({ message: "Password does not match" });
        }
      } else {
        return res.status(401).json(CustomErrorHandler.unAuthorized());
      }
    } catch (error) {
      next(error);
    }
  }
  // FORGOT PASSWORD
  async forgotPassword(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await userServices.findUser({ email });
      if (!user) {
        return res.status(400).json({ message: "User not found!!" });
      }
      const hashThePassword = await passwordServices.hashPass(password);
      await userServices.updateUser({
        password: hashThePassword,
      });

      return res.status(200).json({ message: "Password Changed!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new UserController();
