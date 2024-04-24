import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './Team.css'
import aviral from '../../assets/aviral.png'
import kudnar from '../../assets/kudnar.png'
import mayank from '../../assets/mayank.png'
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaBitcoin,
  FaLinkedin
} from 'react-icons/fa'
import Footer from '../../components/Footer/Footer'
import { motion } from 'framer-motion'
import logo from '../../assets/rtf1.png'
import { Link } from 'react-router-dom'

const Team = () => {
  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Navbar />
      <div className='team-head'>
        <div className='th-main'><img src={logo} alt="" />OUR TEAM</div>
        <div className='th-p'>
          <p><span>MEATBET</span> is fueled by a dedicated team of blockchain enthusiasts,
            developers, designers, and industry experts.
            With a shared passion for innovation, we've come together to
            create an unforgettable experience for fantasy enthusiasts.</p>
        </div>
      </div>
      <div className='team-card'>
        <div className='team-man'>
          <div className='team-img' id='av'><img src={aviral} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><a href="https://www.instagram.com/aviral_hatwal/"><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/aviral-hatwal-1734b0258"><FaLinkedin size={40} /></a><a href="https://github.com/cyberviking5"><FaGithub size={40} /></a></div>
            <h1>AVIRAL HATWAL</h1>
            <span>BlockChain Enthusiast</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
        </div>
        <div className='team-man'>
          <div className='team-img' id='kd'><img src={kudnar} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><Link to='/fb'><FaInstagram size={40} /></Link><a href="https://www.linkedin.com/in/yash-kudnar-64544a224"><FaLinkedin size={40} /></a><a href="https://github.com/Yash9276"><FaGithub size={40} /></a></div>
            <h1>YASH KUDNAR</h1>
            <span>BlockChain Enthusiast</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
        </div>
        <div className='team-man'>
          <div className='team-img' id='mr'><img src={mayank} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><a href="https://www.instagram.com/smayank_12/"><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/mayank-rawat-8aa02a257"><FaLinkedin size={40} /></a><a href="https://github.com/smayank1214"><FaGithub size={40} /></a></div>
            <h1>MAYANK RAWAT</h1>
            <span>FRONTEND DEVELOPER</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
        </div>
        <div className='team-man'>
          <div className='team-img' id='ay'><img src={mayank} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><a href="https://www.instagram.com/smayank_12/"><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/mayank-rawat-8aa02a257"><FaLinkedin size={40} /></a><a href="https://github.com/smayank1214"><FaGithub size={40} /></a></div>
            <h1>ANKIT YADAV</h1>
            <span>FRONTEND DEVELOPER</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
        </div>
        <div className='team-man'>
          <div className='team-img' id='sm'><img src={mayank} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><a href="https://www.instagram.com/sukrit_malpani?igsh=MWhxeDkzcXh6ZHRxdw=="><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/sukrit-malpani-093612255?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app "><FaLinkedin size={40} /></a><a href="https://github.com/sukritmalpani/sukritmalpani"><FaGithub size={40} /></a></div>
            <h1>SUKRIT MALPANI</h1>
            <span>FRONTEND DEVELOPER</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
        </div>
        <div className='team-man'>
          <div className='team-img' id='ns'><img src={mayank} alt="" /></div>
          <div className='tb'>
            <div className='social-img'><a href="https://www.instagram.com/smayank_12/"><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/mayank-rawat-8aa02a257"><FaLinkedin size={40} /></a><a href="https://github.com/smayank1214"><FaGithub size={40} /></a></div>
            <h1>NEELESH SAXENA</h1>
            <span>FRONTEND DEVELOPER</span>
            <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
          </div>
          {/* <div className='team-man'>
            <div className='team-img' id='ns'><img src={mayank} alt="" /></div>
            <div className='tb'>
              <div className='social-img'><a href="https://www.instagram.com/neelesh_133?utm_source=qr&igsh=MTBnNmIzZW1leWd4aA=="><FaInstagram size={40} /></a><a href="https://www.linkedin.com/in/neelesh-saxena-738288257?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"><FaLinkedin size={40} /></a><a href="https://github.com/neelesh133"><FaGithub size={40} /></a></div>
              <h1>NEELESH SAXENA</h1>
              <span>FRONTEND DEVELOPER</span>
              <p>We as a team are very responsible and clear with our vision. Our mission, purpose, goals and values involved the creation of our vision. </p>
            </div>
          </div> */}
        </div>
      </div>
      <Footer />
    </motion.div>
  )
}

export default Team
