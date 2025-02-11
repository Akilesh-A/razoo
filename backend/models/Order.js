const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  customer: {
    name: String,
    email: String,
    mobile: String,
    address: String,
    city: String,
    pincode: String,
  },
  cartItems: [
    {
      name: String,
      price: Number,
      quantity: Number,
    },
  ],
  totalAmount: Number,
  paymentStatus: { type: String, default: "Pending" },
  razorpayOrderId: String,  // Store Razorpay order ID
  razorpayPaymentId: String, // Store successful payment ID
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
