import jwt from "jsonwebtoken";

const authMdE = async (req, res, next) => {
  const { token } = req.headers;

  if (!token) {
    return res.json({
      success: false,
      message: "Access denied. No token provided.",
    });
  }

  try {
    const json_decode = jwt.verify(token, process.env.JWT_SECRET);
    req.body.userId = json_decode.id;
    next();
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Token is invalid" });
  }
};

export default authMdE;
