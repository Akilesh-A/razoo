import HomeCategory from "../../Components/homecategories/HomeCategory";
//images
// import banner1 from "../../assets/images/banner/banner1.png"
// import banner2 from "../../assets/images/banner/banner1.png"
// import image1 from "../../assets/images/homepage/1.jpg"

import banner1 from "../../assets/images/banner/1.webp"
import banner2 from "../../assets/images/banner/2.webp"
import image1 from "../../assets/images/homepage/11.jpg"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// import required modules
import { Pagination,Autoplay,Navigation } from 'swiper/modules';

//icons 
// import { TiShoppingCart } from "react-icons/ti";
import { AiOutlineShoppingCart } from "react-icons/ai";

//Css
import "./Home.css"
import { useNavigate } from "react-router-dom";

const Home = () => {

  const navigate =useNavigate();

  const handleNavigate=()=>{
    navigate("/Product")
  }
  const homeBanner=[
    {
      img:banner1,
      imgCaption:"Banner1"
    },
    {
      img:banner2,
      imgCaption:"Banner2"
    },
  ]
  const EssentialSlider=[
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
  ]
  const Category=[
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
    {
      img:image1,
      imgCaption:"image1"
    },
  ]
  return (
    <>
      <section className="home-sec-1-wrapper">
        <div className="container-fluid ">
          <Swiper
            pagination={{
              dynamicBullets: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {homeBanner.map((items, index) => (
              <SwiperSlide key={index}>
                <img src={items.img} alt={items.imgCaption} className="w-100" />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      <section className="home-sec-2-wrapper hom-sec2-bg">
        <div className="container">
            <div className="row row-gap-5">
              <div className="col-md-4">
                <h4 className="sec-2-h-Ct">Wedding Wardrobe Essentials!</h4>
                <p className="sec-2-p-ct">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae officia dolore ut harum.</p>
                <button className="btn-Shop-t" onClick={handleNavigate}><AiOutlineShoppingCart/> Shop Now </button>
              </div>
              <div className="col-md-8">
                <Swiper
                  centeredSlides={true}
                  spaceBetween={30}
                  loop={true}
                  grabCursor={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  breakpoints={{
                   380: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView:3,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  {EssentialSlider.map((items,index)=>(
                      <SwiperSlide key={index}>
                        <div>
                          <img src={items.img} className="w-100" alt={items.imgCaption} />
                        </div>
                      </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
        </div>
      </section>

      <section className="home-sec-2-wrapper hom-sec3-cat-bg">
        <div className="container">
              <h2 className="title-home">Shop By Category</h2>
              <div className="row my-4 row-gap-4">
                {Category.map((items,index)=>
                  <div className="col-md-3 col-6" key={index}>
                    <HomeCategory items={items} />
                  </div>
                )}
              </div>
        </div>
      </section>

      <section className="home-sec-2-wrapper sect-4-bg-texture">
        <div className="container">
            <div className="row row-gap-5">
            <div className="col-md-8">
                <Swiper
                  centeredSlides={true}
                  spaceBetween={30}
                  loop={true}
                  grabCursor={true}
                  autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                  }}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  breakpoints={{
                   380: {
                      slidesPerView: 1,
                      spaceBetween: 20,
                    },
                    640: {
                      slidesPerView: 2,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      spaceBetween: 40,
                    },
                    1024: {
                      slidesPerView:3,
                      spaceBetween: 50,
                    },
                  }}
                  modules={[Autoplay, Pagination, Navigation]}
                  className="mySwiper"
                >
                  <SwiperSlide>
                    <div>
                      <img src={image1} className="w-100" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={image1} className="w-100" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={image1} className="w-100" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={image1} className="w-100" alt="" />
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div>
                      <img src={image1} className="w-100" alt="" />
                    </div>
                  </SwiperSlide>
                  
                </Swiper>
              </div>
              <div className="col-md-4">
                <h4 className="sec-2-h-Ct">Best Selling Products!</h4>
                <p className="sec-2-p-ct">Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae officia dolore ut harum.</p>
                <button className="btn-Shop-t" onClick={handleNavigate}><AiOutlineShoppingCart/> Shop Now </button>
              </div>
            </div>
        </div>
      </section>
    </>
  )
}

export default Home