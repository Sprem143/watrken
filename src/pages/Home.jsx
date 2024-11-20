import '../App.css';
import '../index.scss'
import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { motion } from "framer-motion";
export default function Home() {





    return (
        <>
            {/*-------------carousel-------------  */}
            <Carousel className='ps-4 pe-4'>
                <Carousel.Item>
                    <img src="/static/carousel/slide1.avif" className='carousel-img' alt="slide-01" text="First Image" height='80vw' />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1 ><b>Offer</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/static/carousel/slide2.avif" className='carousel-img' alt="slide-01" text="First Image" height='80vw' />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1 ><b>Offer</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/static/carousel/slide3.jpg" className='carousel-img' alt="slide-01" text="First Image" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1 ><b>Offer</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src="/static/carousel/slider4.avif" className='carousel-img' alt="slide-01" text="First Image" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1 ><b>Offer</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
               
              

              
            </Carousel>
            <div className="ps-4 pe-4">

                <h1 className='mt-4'>Welcome to Watrken - Your Trusted Water Delivery Partner!</h1>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-5 col-md-5 col-sm-12 ps-4 pe-4 mt-4 fs-5">
                            <p>In today’s fast-paced world, staying hydrated is essential for health, productivity, and well-being. Watrken is here to ensure you never run out of fresh, clean drinking water. Our water delivery app simplifies your life by providing a seamless way to order premium-quality water cans right to your doorstep.</p>
                            <h3>Who We Are ?                </h3>
                            <p>At AquaCane, we’re more than just a delivery service. We’re a team committed to making access to clean and safe drinking water effortless and convenient for everyone. Whether you’re at home, in the office, or hosting an event, we ensure timely deliveries tailored to your needs.
                            </p>
                            <h3>Why Choose AquaCane?                </h3>
                            <ul>
                                <li> <span className='aq'>Easy Ordering : </span> Place your order with just a few taps.
                                </li>
                                <li> <span className='aq'>Reliable Delivery: </span>Count on us for prompt, hassle-free deliveries.
                                </li>
                                <li> <span className='aq'>Quality Assurance: </span> We partner with trusted brands to ensure the highest water quality.
                                </li>
                                <li> <span className='aq'>Flexible Plans: </span> Choose from single orders, weekly, or monthly subscriptions.
                                </li>

                            </ul>
                        </div>

                        <div className="col-lg-7 col-md-7 col-sm-12 d-flex justify-content-center">
                        
                            <motion.img
    src="/static/home_002.png"
    alt="Animated"
    animate={{
        y: [0, -20, 0], // Moves up 20px and back to 0
      }}
      transition={{
        duration: 1, // Animation duration in seconds
        repeat: Infinity, // Loops forever
        repeatType: "loop", // Smooth looping
      }}
  />
                        </div>
                    </div>
                </div>
            </div>


        </>

    )
}