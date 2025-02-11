
//Components
import NavBar from "./Components/NavBar/Navbar"
import Home from "./Pages/Home/Home"
import Cart from "./Pages/Cart/Cart"
import About from "./Pages/About/About"
import Contact from "./Pages/Contact/Contact"
import Product from "./Pages/Product/Product"
import ProductDetail from "./Pages/productDetail/ProductDetail.jsx"
import Footer from "./Components/Footer/Footer.jsx"
import Wishlist from "./Pages/wishlist/Wishlist.jsx"
import LoginSignup from "./Pages/LoginSignup/LoginSignup.jsx"
import Checkout from "./Pages/Checkout/Checkout.jsx"
import { Route,Routes } from "react-router-dom"; 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Termsandconditions from "./Pages/terms/Termsandconditions.jsx"
import Policy from "./Pages/policies/Policy.jsx"
import Account from "./Pages/account/Account.jsx"
import Stories from "./Pages/stories/Stories.jsx"
//Css
import './App.css'
function App() {

  return (
    <>
       <ToastContainer
                    position="top-center"
                    autoClose={3000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
      <NavBar/>
      <main>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/About" element={<About/>} />
            <Route path="/Contact" element={<Contact/>} />
            <Route path="/Product" element={<Product/>} />
            <Route path="/Cart" element={<Cart/>} />
            <Route path="/Wishlist" element={<Wishlist/>} />
            <Route path="/ProductDetail" element={<ProductDetail/>} />
            <Route path="/login" element={<LoginSignup />} />
            <Route path="/Checkout" element={<Checkout />} />
            <Route path="/Termsandconditions" element={<Termsandconditions />} />
            <Route path="/Policy" element={<Policy />} />
            <Route path="/Account" element={<Account />} />
            <Route path="/Stories" element={<Stories />} />
          </Routes>
      </main>
      <Footer/>
    </>
  )
}
export default App
