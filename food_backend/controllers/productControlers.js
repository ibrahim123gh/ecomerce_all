import user from "../models/usersModule.js";

const addProd = async (req, res) => {
  try {
    const users = await user.findById(req.body.userId);
    const userData = await users.dbCard;

    if (!userData[req.body.itemId] > 0) {
      userData[req.body.itemId] = 1;
    } else {
      userData[req.body.itemId] += 1;
    }

    const updatedData = await user.findByIdAndUpdate(req.body.userId, {
      dbCard: userData,
    });
    res.json({ success: true, message: "item add successfly" });
  } catch (error) {
    console.log(error);
  }
};

const removeProd = async (req, res) => {
  try {
    const users = await user.findById(req.body.userId);
    const userData = await users.dbCard;

    if (userData[req.body.itemId] > 0) {
      userData[req.body.itemId] -= 1;
    }

    const updatedData = await user.findByIdAndUpdate(req.body.userId, {
      dbCard: userData,
    });

    res.json({ success: true, message: "item remove successfly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const users = await user.findById(req.body.userId);
    const userData = await users.dbCard;

    res.json({ success: true, userData })
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { addProd, removeProd, getProduct };
