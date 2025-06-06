import React from 'react';
import "./About.css";
import images from '../../constants/images';

const About = () => {
  return (
    <section className='about section-p bg-dark' id = "about">
        <div className='container'>
            <div className='about-content grid text-center'>
                <div className = "content-left">
                    <img src = {images.about_main_img} alt = "" />
                </div>
                <div className='content-right'>
                    <div className='section-t'>
                        <h3>About Us</h3>
                    </div>
                    <p className = "text">Welcome to Cloud Era, your ultimate platform for cloud computing insights, comparisons, and guidance. Designed to be a comprehensive resource, Cloud Era empowers users with tools and information to make informed decisions in the rapidly evolving world of cloud technology.At Cloud Era, we combine cutting-edge technology with a user-friendly experience. Our web-based application integrates a powerful chatbot interface powered by a Large Language Model (LLM), offering context-aware and accurate responses to your queries. Whether you're exploring cloud services, seeking security guidance, or comparing costs, our chatbot is equipped to assist with real-time, reliable information.</p>
                </div>
            </div>
        </div>
    </section>
  )
}

export default About