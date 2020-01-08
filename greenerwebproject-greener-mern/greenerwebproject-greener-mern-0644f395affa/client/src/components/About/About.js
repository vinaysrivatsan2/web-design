import React from 'react';
import './About.css';
import aImg from "../../assets/images/About.jpg";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class About extends React.Component {

    render() {
        return (
            <div className="container"style={{textAlign:"center"}} >
            <h2 style={{textAlign:"center"}}>About Us</h2>
            <div className="divImg">
            <img className="Img" src={aImg}></img></div>

           <p><strong>Greener</strong> is a sustainability nonprofit organization working with the most influential investors and companies to build leadership and drive solutions throughout the economy. Through powerful networks and advocacy, Greener tackles the world’s biggest sustainability challenges, including climate change, water scarcity and pollution, and inequitable workplaces.

           Our mission: Greener is transforming the economy to build a sustainable future for people and the planet. </p>


            </div>
        );
    }
}

export default About;
