import { FaHeart } from "react-icons/fa"; // Importing the heart icon
import "../items/Items.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../features/products/WishlistSlice";
import { useNavigate } from "react-router-dom";
import {  toast } from 'react-toastify';
import axios from "axios";
 
const Items = ({ prdts}) => {
  const api="http://localhost:5000"
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.wishlist);
  const navigate = useNavigate();
 const { isLogin, user } = useSelector((state) => state.auth);
 
  const handleClick = () => {
    navigate("/ProductDetail", { state: { product: prdts } });
  };
  const isWishlisted = wishlist.some((item) => item.product_id === prdts.id);

  const toggleWishlist = async () => {
    try {
      if (isWishlisted) {
        // Dispatch action to remove product from wishlist in the Redux store
        dispatch(removeFromWishlist({product_id:prdts.id}));
      
        // Send loga request to remove the product from the user's wishlist on the server
       if(isLogin) {
        await axios.delete(`${api}/api/wishlist/remove`, {
          data: {
            userId: user,
            productId: prdts.id,
          },
        });
      }
        // Show success notification
        toast.success("Removed from Wishlist ❤");
      } else {
        // Dispatch action to add product to wishlist in the Redux store
        dispatch(addToWishlist({product_id:prdts.id}));
         console.log(user,prdts.id);
         
        // Send a request to add the product to the user's wishlist on the server
        if(isLogin){
        await axios.post(api+"/api/wishlist/add", {
          userId: user,
          productId: prdts.id,
        });
      }
        // Show success notification
        toast.success("Added to Wishlist ❤");
      }
    } catch (error) {
      // Show error notification if the request fails
      toast.error("An error occurred. Please try again.");
    }
  };

  return prdts ? (
    <>

      <div className="product-card">
        {/* Wishlist icon */}
        <div className="wishlist-icon" onClick={toggleWishlist}>
          <FaHeart className={isWishlisted ? "wishlist-heart" : ""} />
        </div>
        <div className="product-img">
          <img
            src={prdts?.images[0]?.url}
            alt="Aila organza"
            loading="lazy"
            className="img-fluid"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title popup_cart_title">{prdts.name}</h3>
          <div>
            <p className="truncate">{prdts.description}</p>
          </div>
          <div className="product-price">
            <span className="normal-price">{prdts.price}</span>
            <span className="offer-price">{prdts.price}</span>
            <span className="discount">50%</span>
          </div>
          <div className="product-size">
            {prdts?.size?.map((siz, index) => {
              return <span key={index}>{siz.name}</span>;
            })}
          </div>
          <div className="product-colors">
            {prdts?.color?.slice(0, 3).map((clr, index) => {
              return (
                <span
                  className="color-swatch"
                  key={index}
                  style={{ backgroundColor: clr.name }}
                ></span>
              );
            })}
            { 
             prdts?.color?.length - 4 <= 0 ? (
              ""
            ) : (
             
                <span className="color-swatch" style={{border:"none",fontSize:"12px",transform:"translateY(-3px"}}>
                  +{prdts?.color?.length - 4}
                </span>
              
            )}
          </div>
          <div>
            <button className="add-to-cart-btn" onClick={handleClick}>
              view more
            </button>
          </div>
        </div>
      </div>
    </>
  ) : (
    <>loading</>
  );
};

export default Items;
