import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { paymentId, orderId, totalAmount } = location.state || {};

  console.log(paymentId, orderId, totalAmount);
  

 
  
  if (!paymentId) {
    return <h2>No order details found!</h2>;
  }

  const handleCancelOrder = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/order/cancel-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, paymentId }),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order cancelled and refund initiated!");
        navigate("/cart"); // Redirect back to cart
      } else {
        alert("Failed to cancel order. Try again!");
      }
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="order-confirmation-container text-center">
      <h2>Order Confirmation</h2>
      <p><strong>Payment ID:</strong> {paymentId}</p>
      <p><strong>Order ID:</strong> {orderId}</p>
      <p><strong>Total Amount:</strong> Rs. {totalAmount}</p>

      <button className="btn btn-danger mt-3" onClick={handleCancelOrder}>
        Cancel Order
      </button>
    </div>
  );
};

export default OrderConfirmation;
