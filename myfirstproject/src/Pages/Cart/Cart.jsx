import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Cart.css";
import { FaTrashAlt, FaPlusCircle, FaMinusCircle } from "react-icons/fa";
import emptyCartImg from "../../assets/images/wishlist/empty-cart.png";
import flow1 from "../../assets/images/images-floral/f-1.jpg";
import flow2 from "../../assets/images/images-floral/f-2.jpg";


const demoCart = [
  {
    id: 1,
    name: "Elegant Floral Bouquet",
    description: "A beautiful bouquet with fresh flowers.",
    size: [{ name: "Medium" }],
    price: 1200,
    discountedPrice: 999,
    images: [{ url: "https://via.placeholder.com/150" }],
    quantity: 1,
  },

];

const DisclaimerModal = ({ showModal, handleClose }) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 className="modal-header">Terms & Conditions</h3>
        <p> * By proceeding, you agree to our return, exchange, and product policies.</p>
        <p> * No damage</p>
        <div className="modal-footer">
          <button className="modal-btn cancel" onClick={() => handleClose(false)}>
            Cancel
          </button>
          <button className="modal-btn accept" onClick={() => handleClose(true)}>
            Agree
          </button>
        </div>  
      </div>
    </div>
  );
};

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);

  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // Load demo cart items on component mount
  useEffect(() => {
    setCartItems(demoCart);
  }, []);

  const updateQuantity = (id, amount) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.discountedPrice * item.quantity, 0).toFixed(2);
  };

  const handleTermsCheckbox = () => {
    if (isTermsAccepted) {
      setIsTermsAccepted(false);
    } else {
      setShowModal(true);
    }
  };

  const handleTermsClose = (accepted) => {
    setShowModal(false);
    if (accepted) {
      setIsTermsAccepted(true);
    }
  };

  return (
<div className={`cart-parent ${cartItems.length>0 ? "cart-bg":''}`}>
<div className="cart-container">
      {/* {cartItems.length > 0 && (
        <>
          <img src={flow1} alt="Floral Design" className="floral-decoration-top-left" />
        </>
      )} */}
  
      <h2>Shopping Cart</h2>
  
      {cartItems.length > 0 ? (
        <>
          <div className="cart-layout">
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-card">
                  <img src={item.images[0].url} alt={item.name} className="cart-img" />
                  <div className="cart-details">
                    <h3>
                      <img src={flow1} alt="Floral Icon" className="floral-icon" />
                      {item.name}
                    </h3>
                    <p>{item.description}</p>
                    <p>
                      <strong>Size:</strong> {item.size?.[0]?.name || 'N/A'}
                    </p>
                    <div className="cart-actions">
                      <span className="price">Rs. {item.discountedPrice * item.quantity}</span>
                      <br />
                      <div className="quantity-controls">
                        <div className="decrease-btn">
                          <FaMinusCircle
                            onClick={() => updateQuantity(item.id, -1)}
                            className="cart-decrease-btn"
                          />
                        </div>
                        <span className="cart-quantity">{item.quantity}</span>
                        <div className="increase-btn">
                          <FaPlusCircle
                            onClick={() => updateQuantity(item.id, 1)}
                            className="cart-increase-btn"
                          />
                        </div>
                      </div>
                      <button className="remove-btn" onClick={() => removeItem(item.id)}>
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
  
            <div className="cart-summary">
              <h3 className="order-head">Order Summary</h3>
              <img src={flow2} alt="Floral Design" className="floral-summary-decoration" />
              <p className="price">
                Subtotal: Rs. <strong>{getTotalPrice()}</strong>
              </p>
              <button
                className="checkout-btn"
                onClick={() => navigate('/checkout', { state: { cartItems, totalAmount: getTotalPrice() } })}
              >
                Proceed to Checkout
              </button>
              <button className="continue-shopping-btn" onClick={() => navigate("/Product")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </>
      ) : (
        <section className="wishList-empty">
          <div className="container">
            <div className="inner-empt-wlist">
              <img src={emptyCartImg} width="200px" alt="" />
              <h5 className="wish-empty-title text-center">
                Oops! No items found. Browse and add some
              </h5>
              <Link to="/Product" className="empty-wishlist-btn">
                Shop Now
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Disclaimer Modal */}
      <DisclaimerModal showModal={showModal} handleClose={handleTermsClose} />
    </div>
</div>

  );
};

export default Cart;
  