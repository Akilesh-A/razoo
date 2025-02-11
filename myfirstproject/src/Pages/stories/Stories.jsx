import React from 'react'
import abtimg from '../../assets/images/homepage/about-image.webp'
import abtimgbg from '../../assets/images/bg-2.png'
import "./Stories.css"
const Stories = () => {
  return (
    <>
        <section className='abt-storie-sec-wrap abt-stories-bg'>
            <img src={abtimgbg} alt="" className='abtimgbg' />
            <img src={abtimgbg} alt="" className='abtimgbg abt-st-2' />
            <div className="container">
                <div className="row row-gap-5">
                    <div className="col-md-6">
                        <h3 className='abt-str-title'>The Seelaikaari Story</h3>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                    </div>
                    <div className="col-md-6">
                        <img src={abtimg} alt="" className='w-100' />
                    </div>
                </div>
            </div>
        </section>
        <section className='abt-storie-sec-wrap'>
            <div className="container">
                <div className="row row-gap-5">
                   
                    <div className="col-md-6">
                        <img src={abtimg} alt="" className='w-100' />
                    </div>
                    <div className="col-md-6">
                        <h3 className='abt-str-title'>The Seelaikaari Story</h3>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                        <p className='abt-cont'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit laboriosam quas dignissimos ipsa cumque? Illum veniam, iusto optio, tempora sapiente minus libero eos nulla neque illo voluptatibus, numquam at magnam!</p>
                    </div>
                </div>
            </div>
        </section>
    </>
  )
}

export default Stories