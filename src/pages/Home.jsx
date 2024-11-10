import '../App.css';
import '../index.scss'
import Carousel from 'react-bootstrap/Carousel';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export default function Home() {

   

    const registerdirector = async () => {
        console.log("called")
        let result = await fetch('http://localhost:8050/director/signup', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ mobile: 7366943700, password: 123 })
        });
        result = await result.json();
        alert(result);
        console.log(result)
    }

    return (
        <>
            {/* <button onClick={registerdirector}>Register admin</button> */}
            {/*-------------carousel-------------  */}
            <Carousel>
                <Carousel.Item>
                    <img src="/static/carousel/images.jpeg" className='carousel-img' alt="slide-01" text="First Image" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1 ><b>Offer</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/static/carousel/packaged-drinking-water-bottles-250x250.webp" className='carousel-img' alt="slide 02" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1><b>LIMITED TIME OFFER</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
                <Carousel.Item>
                    <img src="/static/carousel/packaged-drinking-water-service-500x500.webp" className='carousel-img' alt="slie 03" text="Slide 03" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1><b>LIMITED TIME OFFER</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>

                <Carousel.Item>
                    <img src="/static/carousel/water-supplier-in-lalbaug.webp" className='carousel-img' alt="slie 03" text="Slide 03" />
                    <Carousel.Caption className='mb-4 c_text'>
                        <h1><b>LIMITED TIME OFFER</b> </h1>
                        <p>Offer details</p>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel>
            <section className='about dfdr p-4'>
                <div className='about-text p-3'>
                    <h1 className="text-danger text-center fw-bold">Our Vision</h1>
                    <p>Welcome to My School, where education meets innovation and holistic development! Founded in accordance with the principles outlined in India's new education policy, we strive to create a nurturing and empowering environment for students from grades 1 to 10.
                        <br />
                        &emsp;&emsp;At My school, we believe in fostering a love for learning that goes beyond textbooks. Our curriculum is designed to be holistic, incorporating not just academic excellence but also a focus on critical thinking, creativity, and practical skills. We understand that each child is unique, and our teaching methods are tailored to cater to diverse learning styles, ensuring that every student reaches their full potential.
                    </p>
                    <p>&emsp;&emsp;
                        One of the key pillars of our school is the emphasis on experiential learning. We provide ample opportunities for students to engage in hands-on activities, projects, and real-world experiences that enhance their understanding and application of concepts. From science experiments to art workshops, from field trips to community service projects, our students are encouraged to explore, question, and discover.
                    </p>
                    <p>&emsp;&emsp;Here, education is not just about acquiring knowledge; it's about nurturing compassionate, creative, and confident individuals who are equipped to thrive in an ever-changing world. Join us on this journey of discovery, growth, and excellence!</p>
                </div>
                <div className='about-img dfdc jc ac'>
                    <h3 className="text-danger">Proprieter</h3>
                    <img src="/static/Prem.png" alt="" height="400" />
                    <h4 className="td">Mr. Prem Kumar</h4>
                    <p>Software Engineer</p>
                    <div className="hvr dfdc">
                        <h1 className="text-center text-white">Prof.  Prem Kumar</h1>
                        <h4 className='text-white'> <b>Graduate from BNMU</b></h4>
                        <p className='p-4 fw-bold text-white'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Doloribus distinctio minima eaque debitis itaque excepturi minus officia eligendi est voluptate vero, hic, corporis et commodi accusantium dignissimos doloremque odio fugit.</p>
                        <button className='btn btn-primary'>Know More</button>
                    </div>
                </div>
            </section>
         
        </>

    )
}