import user from "../models/usersModule.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await user.findOne({ email });

    if (!users) {
      res.json({ success: false, message: "Email Not Exist" });
    }

    const isMatch = await bcrypt.compare(password, users.password);

    if (!isMatch) {
      res.json({ success: false, message: "Invalid Password" });
    }

    const loginJwt = userToken(users.id);

    res.json({ success: true, message: "Login Success", token: loginJwt });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const userToken =  (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
  console.log(id)
};

const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await user.findOne({ email });

    if (!email) {
      res.json({ success: false, message: "Email Is Required" });
    }

    if (!validator.isEmail(email)) {
      res.json({ success: false, message: "Invalid email" });
    }

    if (exist) {
      res.json({ success: false, message: "Email Alredy Exist" });
    }

    if (password.length < 8) {
      res.json({
        success: false,
        message: "Password must be at least 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createUser = new user({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const savedUser = await createUser.save();
    const token = await userToken(savedUser.id);
    res.json({ success: true, message: "User Created", token: token });
    console.log(token);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { userLogin, userRegister };
