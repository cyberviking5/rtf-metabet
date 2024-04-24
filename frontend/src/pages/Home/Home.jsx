import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Home.css'
import Scroller from '../../components/Scroller/Scroller';
import paisa from '../../assets/paisa.mp4'
// import hockeyyy from '../../assets/hockeyyy.jpg'
// import crickettt from '../../assets/crickettt.jpg'
// import footballl from '../../assets/footballl.jpg'
// import tennisss from '../../assets/tennisss.jpg'
import { gsap } from "gsap";
import CustomEase from 'gsap/CustomEase'
import Rating from '../../components/Rating/Rating';
import Tech from '../../components/Tech/Tech';
import Footer from '../../components/Footer/Footer';
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import Lenis from '@studio-freight/lenis'
import { motion } from 'framer-motion'
import landinglogo from '../../assets/rtf3.png';
import arrow from "../../assets/arrow_outward.png"


const Home = () => {


  // document.querySelectorAll(".elem").forEach(function (elem) {
  //   var rotate = 0;
  //   var diffrot = 0;

  //   elem.addEventListener("mouseleave", function (dets) {
  //     gsap.to(elem.querySelector("img"), {
  //       opacity: 0,
  //       ease:  'gsap.Power3.easeOut',
  //       duration: 0.5,
  //     });
  //   });

  //   elem.addEventListener("mousemove", function (dets) {
  //     var diff = dets.clientY - elem.getBoundingClientRect().top;
  //     diffrot = dets.clientX - rotate;
  //     rotate = dets.clientX;
  //     gsap.to(elem.querySelector("img"), {
  //       opacity: 1,
  //       ease:  'gsap.Power3.easeOut',
  //       top: diff,
  //       left: dets.clientX,
  //       rotate: gsap.utils.clamp(-20, 20, diffrot * 0.5),
  //     });
  //   });
  // });
  const lenis = new Lenis()
  lenis.on('scroll', (e) => {
    // console.log(e)
  })
  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }

  requestAnimationFrame(raf)
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="home  h-[100vh]">
        <Navbar />
        <div className="landing-page">
          <div className="main">
            <div className="hero">
              <div className="hero-heading">
                <p>NOW BET</p>
                <p>ONLINE IN A MORE SECURE </p>
                <div className='kuch'><img src={landinglogo} alt="" /><p>WAY WITH US</p></div>
              </div>
              <div className='hero-buttons'>
                <a href='#second' className='buttonss' onClick={(() => lenis.scrollTo('#second'))}><button>BOXING</button></a>
                <a href='#fourth' className='buttonss' onClick={(() => lenis.scrollTo('#fourth'))}><button>TECH STACK</button></a>
              </div>
            </div>
            <div className="main-lastline">
              YOUR GATEWAY TO A REVOLUTIONARY FANTASY BETTING EXPERIENCE. WE'RE
              ON A MISSION TO TRANSFORM THE WAY YOU ENGAGE WITH SPORTS AND
              ENTERTAINMENT
            </div>
          </div>
        </div>
      </div>
      <Scroller />
      <div className="pannel" id="first">
        {/* <Scroller/> */}
        <div className="firstmain">
          <div className="firstmainText">
            <p className="firstbada">
              At <span>MetaBet</span>, we envision a world where users can
              participate in secure, transparent, and rewarding fantasy betting
              activities.{" "}
            </p>
            <p className="firstchota">
              Our platform harnesses the potential of blockchain to bring you an
              unparalleled level of trust and excitement. We're not just a
              betting website, we're a community-driven ecosystem that believes
              in fairness, innovation, and fun.
            </p>
          </div>
          <div className="firstvideo">
            <video autoPlay loop muted src={paisa}></video>
          </div>
        </div>
      </div>

      <Scroller />

      <div className="panel" id="second">
        <div className="sec-head">
          <Link to="/games" className='link_to'>
            <div className="sec-feat">BOX<span>ING</span></div>
            <img src={arrow} className='arrow'></img>
          </Link>
          <div className="sec-fea-p">We envision a world where users can participate in secure, transparent and rewarding fantasy betting activities. Our platform harnesses the potential of blockchain to bring you an unparalleled level of trust and excitement. </div>
        </div>
      </div>

      <Scroller />



      <div className="panel" id="third">
        <div className='third-head'>
          <h1>REVIEWS & <br /><span>RATINGS</span></h1>
        </div>
        <div className='third-bot'>
          <Rating />
        </div>
      </div>


      <Scroller />


      <div className="panel" id="fourth">
        <div className='fourth-head'>
          <h1 className='fourth-heading'>TECH <span>STACK</span></h1>
          <p className='fourth-head-p'>TO MAKE THIS PROJECT POSSIBLE WE HAVE USED A NUMBER OF TECHNOLOGIES SO THAT WE CAN GIVE THE BEST PROJECT POSSIBLE .</p>
        </div>
        <div>
          <Tech />
        </div>
      </div>

      <Footer />
    </motion.div>
  );
}

export default Home;
