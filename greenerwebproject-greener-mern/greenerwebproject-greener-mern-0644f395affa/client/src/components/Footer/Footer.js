import React from 'react';
import './Footer.css';
import {Link} from 'react-router-dom';

function Footer() {
    return(
        <footer className="footer">
    
    <ul className="footerleft" >
                   
                    <li>
                    <Link to="/about">About Us </Link>     
                                       
                    </li>
                    <li>
                        <content>•</content>    
                                       
                    </li>
                    <li>
                    Copyright &copy; 2019 Greener Inc. All Rights Reserved                   
                  </li>
                  <li>
                      <content>•</content>    
                                     
                  </li>
                    <li>
                        <Link to="/contactUs">Contact Us </Link>
                    </li>
                </ul>
              <div className="text-center center-block " >
                <a href="https://www.facebook.com/Greener-Corporation-Pvt-Ltd-109422787219524/?modal=admin_todo_tour" target="_blank"><i id="social-fb" className="fa fa-facebook-square fa-2x social space"></i></a>
                <a href="https://twitter.com/Greener18660194" target="_blank"><i id="social-tw" className="fa fa-twitter-square fa-2x social space"></i></a>
                <a href="https://www.instagram.com/gogreenerapp/" target="_blank"><i id="social-gp" className="fa fa-instagram fa-2x social space"></i></a>
                <a href="mailto:gogreenerapp@gmail.com"><i id="social-em" className="fa fa-envelope-square fa-2x social space"></i></a>
                <br></br>
            </div>      
    
</footer>
    );
}
export default Footer;