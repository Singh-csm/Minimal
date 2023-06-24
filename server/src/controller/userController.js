const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
let JWT = require("jsonwebtoken");
const {
  userValidation,
  loginValidation,
} = require("../validation/schemaValidation");

const signupUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, name, password } = data;

    const { error, value } = await userValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await userModel.findOne({ email: email });

    if (user)
      return res
        .status(409)
        .json({ message: "Email already exist, try different email" });
    const bcryptPass = await bcrypt.hash(password, 10);

    const userData = {
      name: name,
      email: email,
      password: bcryptPass,
    };

    const createUser = await userModel.create(userData);
    delete createUser.password;

    return res
      .status(201)
      .json({ message: "User registration successfull", data: createUser });
  } catch (error) {
    console.log(error.message, "signup");
    return res.status(500).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const data = req.body;
    const { email, password } = data;

    const { error, value } = await loginValidation.validateAsync(data);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    const user = await userModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    const userPassword = user.password;
    const originalPassword = await bcrypt.compare(password, userPassword);

    const userId = user._id;

    if (!originalPassword)
      return res.status(401).json({
        status: false,
        message: "Incorrect password, plz provide valid password",
      });

    delete user.password;

    const token = JWT.sign({ userId: userId }, process.env.JWTA, {
      expiresIn: 86400,
    });

    return res
      .status(200)
      .send({ message: "Login Success", data: user, token: token });
  } catch (error) {
    console.log("error in loginUser", error.message);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { signupUser, loginUser };
