import React from "react";
import "../RazorpayPayment/RazorpayPayment.css";

const RazorpayPayment = ({ totalAmount, userDetails, cartItems, setShowPayment }) => {

  // Load Razorpay script dynamically
  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    console.log("User Mobile Before Payment:", userDetails.mobile); // Debugging

    try {
      // Step 1: Fetch the Razorpay Key from the backend
      const keyResponse = await fetch("http://localhost:5000/api/order/get-razorpay-key");
      const keyData = await keyResponse.json();
      const razorpayKey = keyData.key;

      if (!razorpayKey) throw new Error("Failed to get Razorpay key");

      // Step 2: Load Razorpay Script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load Razorpay. Check your internet connection.");
        return;
      }

      // Step 3: Create Razorpay Order
      const orderResponse = await fetch("http://localhost:5000/api/order/create-razorpay-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount }),
      });

      const orderData = await orderResponse.json();
      if (!orderData.success) throw new Error("Failed to create order");

      console.log(" Razorpay Order Created:", orderData);

      // Step 4: Open Razorpay Payment Window
      const options = {
        key: razorpayKey,
        amount: totalAmount * 100,
        currency: "INR",
        name: "Akilesh Store",
        order_id: orderData.order.id,
        handler: async function (response) {
          console.log(" Razorpay Response:", response);

          if (!response.razorpay_payment_id || !response.razorpay_signature) {
            console.error("❌ Missing payment_id or signature from Razorpay!");
            alert("Payment verification failed! Try again.");
            return;
          }

          console.log(" Sending to Backend:", {
            order_id: orderData.order.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            customer: userDetails,
            cartItems,
            totalAmount,
          });

          // Step 5: Verify Payment with Backend
          const paymentResponse = await fetch("http://localhost:5000/api/order/verify-payment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              order_id: orderData.order.id,
              payment_id: response.razorpay_payment_id,
              signature: response.razorpay_signature,
              customer: userDetails,
              cartItems: cartItems,
              totalAmount,
            }),
          });

          const paymentData = await paymentResponse.json();
          console.log(" Payment Verification Response:", paymentData);

          if (paymentData.success) {
            alert("Order stored successfully!");
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.mobile ? userDetails.mobile : "", // Ensuring it's not null
        },
        theme: { color: "#3399cc" },
      };

      console.log(" Razorpay Options:", options); // Debugging

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error(" Error during payment:", error);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <div className="payment-container text-center">
      <h2>Review & Pay</h2>
      <p><strong>Name:</strong> {userDetails.name}</p>
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Mobile:</strong> {userDetails.mobile}</p>
      <p><strong>Total Amount:</strong> <b>Rs. {totalAmount}</b></p>

      <button onClick={handlePayment} className="btn btn-success checkoutButton">
        Pay Now
      </button>

      <button className="btn btn-warning mt-3 mx-2" onClick={() => setShowPayment(false)}>
        Edit Details
      </button>

      <p className="help-text mt-2">
        Need help? <a href="mailto:support@example.com">Contact us</a>
      </p>
    </div>  
  );
};

export default RazorpayPayment;
