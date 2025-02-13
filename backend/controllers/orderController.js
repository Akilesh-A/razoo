const Order = require("../models/Order");
const nodemailer = require("nodemailer");
const Razorpay = require("razorpay");
const crypto = require("crypto");
require("dotenv").config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Step 1: Create Razorpay Order
const createRazorpayOrder = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount) {
      return res.status(400).json({ success: false, message: "Amount is required!" });
    }

    const options = {
      amount: amount * 100, // Convert to paise
      currency: "INR",
      receipt: `order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    res.json({ success: true, order });
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    res.status(500).json({ success: false, message: "Error creating Razorpay order", error: error.message });
  }
};

// Step 2: Verify Payment & Store Checkout Details
const verifyPaymentAndCreateOrder = async (req, res) => {
  try {
    const { order_id, payment_id, signature, customer, cartItems, totalAmount } = req.body;
    if (!order_id || !payment_id || !signature || cartItems.length === 0) {
      return res.status(400).json({ success: false, message: "Missing required payment fields or cart is empty!" });
    }

    // Verify Razorpay Payment Signature
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(order_id + "|" + payment_id)
      .digest("hex");

    if (expectedSignature !== signature) {
      return res.status(400).json({ success: false, message: "Invalid payment signature!" });
    }

    // Save Order in MongoDB
    const newOrder = new Order({
      customer,
      cartItems,    
      totalAmount,
      paymentStatus: "Paid",
      razorpayOrderId: order_id,
      razorpayPaymentId: payment_id,
    });

    await newOrder.save();

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email to Customer
    const customerMailOptions = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: "Order Confirmation from Akilesh Store",
      text: `Dear ${customer.name},

Your payment was successful, and your order has been placed!

Order Details:
${cartItems.map(item => `${item.name} - ${item.quantity} x ₹${item.price}`).join("\n")}

Total Amount Paid: ₹${totalAmount}

Thank you for shopping with us!

Best regards,
Akilesh Store`,
    };

    // Email to Store Owner
    const ownerMailOptions = {
      from: process.env.EMAIL_USER,
      to: "krishnamoorthym3009@gmail.com",
      subject: "New Order Received - Akilesh Store",
      text: `Hello,

A new order has been placed.

Customer Name: ${customer.name}
Email: ${customer.email}
Phone: ${customer.phone}

Order Details:
${cartItems.map(item => `${item.name} - ${item.quantity} x ₹${item.price}`).join("\n")}

Total Amount Paid: ₹${totalAmount}

Please process the order accordingly.

Best regards,
Akilesh Store`,
    };

    // Send emails
    await transporter.sendMail(customerMailOptions);
    console.log(`Email sent to customer: ${customer.email}`);

    await transporter.sendMail(ownerMailOptions);
    console.log("Email sent to store owner: seelaikaari123@gmail.com");

    res.status(201).json({ success: true, message: "Order stored, email sent to customer & owner!", order: newOrder });
  } catch (error) {
    console.error("Error during payment verification:", error);
    res.status(500).json({ success: false, message: "Failed to store order.", error: error.message });
  }
};

// Step 3: Get Razorpay Key for Frontend
const getRazorpayKey = (req, res) => {
  res.json({ key: process.env.RAZORPAY_KEY_ID });
};

const cancelOrder = async (req, res) => {
  try {
    const { orderId, paymentId, email } = req.body;
    console.log("Cancel Request Received:", { orderId, paymentId, email });

    if (!orderId || !paymentId || !email) {
      return res.status(400).json({ success: false, message: "Missing order details!" });
    }

    // Find order in database
    const order = await Order.findOne({ razorpayOrderId: orderId, razorpayPaymentId: paymentId });
    console.log("Found Order:", order);

    if (!order) {
      return res.status(404).json({ success: false, message: "Order not found!" });
    }

    if (order.paymentStatus === "Cancelled") {
      return res.status(400).json({ success: false, message: "Order is already cancelled!" });
    }

    // Process Refund via Razorpay
    console.log("Processing refund for:", paymentId);
    const refund = await razorpay.payments.refund(paymentId, {
      amount: order.totalAmount * 100, // Convert to paise
      speed: "normal",
    });

    console.log("Refund Response:", refund);

    if (!refund || refund.status !== "processed") {
      return res.status(500).json({ success: false, message: "Refund failed!" });
    }

    // Update order status
    order.paymentStatus = "Cancelled";
    await order.save();
    console.log("Order status updated to Cancelled");

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Order Cancelled - Refund Processed",
      text: `Dear Customer,

Your order (Order ID: ${orderId}) has been successfully cancelled.

Refund Details:
Amount: ₹${order.totalAmount}
Refund Status: Initiated

The amount will be credited within 5-7 business days.

Best regards,
Akilesh Store`,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Cancellation email sent to ${email}`);

    res.status(200).json({ success: true, message: "Order cancelled and refund processed!" });
  } catch (error) {
    console.error("Error cancelling order:", error);
    res.status(500).json({ success: false, message: "Failed to cancel order.", error: error.message });
  }
};



module.exports = { createRazorpayOrder, verifyPaymentAndCreateOrder, getRazorpayKey,cancelOrder };
