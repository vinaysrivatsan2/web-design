import React from 'react';
import './ContactUs.css';
import cImg from '../../assets/images/contactUs.jpg';

class ContactUs extends React.Component {

    render() {
        return (
            <div className="container"style={{textAlign:"center"}} >
            <h2 style={{textAlign:"center"}}>Contact Us</h2>
            <div className="divImg">
            <img className="Img" src={cImg}></img></div>

            <h4>Give Us A Buzz!</h4>
            <p> Huntington Ave, Boston, MA<br></br>
            <a href="mailto:gogreenerapp@gmail.com">gogreenerapp@gmail.com</a></p>


            </div>
        );
    }
}

export default ContactUs;
