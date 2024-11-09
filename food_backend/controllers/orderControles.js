import orderModules from "../models/orderModuls.js";
import user from "../models/usersModule.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const url = "http://localhost:5173";

const purchase = async (req, res) => {
  try {
    const newOrder = new orderModules({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();
    await user.findByIdAndUpdate(req.body.userId, { dbCard: {} });

    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 80 * 100,
      },
      quantity: item.quantity,
    }));

    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 80 * 100,
      },
      quantity: 1,
    });

    const sessions = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${url}/verify?success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, success_url: sessions.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error in payment" });
  }
};

const verify = async (req, res) => {
  const { success, orderId } = req.body;
  try {
    if (success === "true") {
      const order = await orderModules.findByIdAndUpdate(orderId, {
        payment: true,
      });
      res.json({ success: true, message: "payed successfully" });
    } else {
      const order = await orderModules.findByIdAndDelete(orderId);
      res.json({ success: true, message: "cancelled successfully" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

const getOrder = async (req, res) => {
  const { userId } = req.body;
  console.log(userId);
  try {
    const order = await orderModules.find({ userId });
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: error });
  }
};

const getAllProduct = async (req, res) => {
  try {
    const order = await orderModules.find({});
    res.json({ success: true, data: order });
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: "error server" });
  }
};

const updateOrder = async (req, res) => {
  try {
    await orderModules.findByIdAndUpdate(req.body.id, {
      status: req.body.status,
    });
    res.json({ success: true, message: "Upload Successfly" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "error" });
  }
};

export { purchase, verify, getOrder, getAllProduct, updateOrder };
