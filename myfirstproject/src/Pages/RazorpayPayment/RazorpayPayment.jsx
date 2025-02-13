import React from "react";
import "../RazorpayPayment/RazorpayPayment.css";
import { useNavigate } from "react-router-dom";

const RazorpayPayment = ({
  totalAmount,
  userDetails,
  cartItems,
  setShowPayment,
}) => {
  const navigate = useNavigate();

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
    console.log("User Details:", userDetails);

    try {
      // Step 1: Fetch the Razorpay Key from the backend
      const keyResponse = await fetch(
        "http://localhost:5000/api/order/get-razorpay-key"
      );
      const keyData = await keyResponse.json();
      const razorpayKey = keyData.key;

      if (!razorpayKey) {
        alert("Failed to get Razorpay key");
        return;
      }

      // Step 2: Load Razorpay Script
      const res = await loadRazorpayScript();
      if (!res) {
        alert("Failed to load Razorpay script.");
        return;
      }

      // Step 3: Create Razorpay Order
      const orderResponse = await fetch(
        "http://localhost:5000/api/order/create-razorpay-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amount: totalAmount }),
        }
      );

      const orderData = await orderResponse.json();
      console.log(orderData+"kascjascacvhcvhcvvcv");
      
      if (!orderData.success) {
        alert("Failed to create Razorpay order");
        return;
      }

      console.log("Razorpay Order Created:", orderData);

      // Step 4: Open Razorpay Payment Window
      const options = {
        key: razorpayKey,
        amount: totalAmount * 100, // Amount in paise
        currency: "INR",
        name: "Akilesh Store",
        order_id: orderData.order.id,
        handler: async function (response) {
          console.log("Razorpay Response:", response);

          if (!response.razorpay_payment_id || !response.razorpay_signature) {
            console.error("❌ Missing payment_id or signature from Razorpay!");
            alert("Payment verification failed! Try again.");
            return;
          }

          // Step 5: Verify Payment with Backend
          const paymentResponse = await fetch(
            "http://localhost:5000/api/order/verify-payment",
            {
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
            }
          );

          const paymentData = await paymentResponse.json();
          console.log("Payment Verification Response:", paymentData);

          if (paymentData.success) {
            alert("Order stored successfully!");

            navigate(`/order-conformation`, {
              state: {
                payment_id: response.razorpay_payment_id,
                orderId: orderData.order.id,
                totalAmount,
              },
            });
          } else {
            alert("Payment verification failed!");
          }
        },
        prefill: {
          name: userDetails.name,
          email: userDetails.email,
          contact: userDetails.mobile || "",
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error during payment:", error);
      alert("Payment failed. Try again!");
    }
  };

  return (
    <div className="payment-container text-center">
      <h2>Review & Pay</h2>
      <p>
        <strong>Name:</strong> {userDetails.name}
      </p>
      <p>
        <strong>Email:</strong> {userDetails.email}
      </p>
      <p>
        <strong>Mobile:</strong> {userDetails.mobile}
      </p>
      <p>
        <strong>Total Amount:</strong> <b>Rs. {totalAmount}</b>
      </p>

      <button
        onClick={handlePayment}
        className="btn btn-success checkoutButton"
      >
        Pay Now
      </button>

      <button
        className="btn btn-warning mt-3 mx-2"
        onClick={() => setShowPayment(false)}
      >
        Edit Details
      </button>

      <p className="help-text mt-2">
        Need help? <a href="mailto:support@example.com">Contact us</a>
      </p>
    </div>
  );
};

export default RazorpayPayment;
