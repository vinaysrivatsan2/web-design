import React from 'react';
import { Jumbotron, Carousel, Card, Button, Container, Row, Col } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import carousel1 from '../../assets/images/carouselN2.jpg'
import carousel2 from '../../assets/images/carousel2.jpg'
import carousel3 from '../../assets/images/carousel3.jpg'
import carousel4 from '../../assets/images/carouselN1.jpeg'
import card1 from '../../assets/images/cardlayouteproducts.jpeg'
import card2 from '../../assets/images/cardlayouteanalysis.jpeg'
import card3 from '../../assets/images/cardLayoutInfo.jpg'

import './HomePage.css';


function HomePage() {
    return (
      <div>
        <Jumbotron>
          <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel1}
              alt="First slide"
            />
            <Carousel.Caption>
            <p className="caption">Don't be mean, just go green</p>
            <h5 className="headCaption">GREENER</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel2}
              alt="Third slide"
            />

            <Carousel.Caption>
            <p className="caption">Welcome to the green team</p>
            <h5 className="headCaption">GREENER</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={carousel3}
              alt="Third slide"
            />

            <Carousel.Caption>
            <p className="caption">Take a stand for the love of green</p>
            <h5 className="headCaption">GREENER</h5>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              src={carousel4}
              alt="Third slide"
            />

            <Carousel.Caption>
            <p className="caption">Go green - stop pretending actions don't have consequences</p>
            <h5 className="headCaption">GREENER</h5>
            </Carousel.Caption>
            </Carousel.Item>
            </Carousel>
          </Jumbotron>


          <Container>
            <Row>
              <Col>
             
                <Card className="cardlayout cardInfo" style={{ width: '18rem' }}>
                <Link to="/products">
                <img
                className="d-block w-100"
                    src={card1}
                    alt="First slide"
                  />  </Link>
                    <Card.Body>
                        <Card.Title>Go Greener!</Card.Title>
                          <Card.Text>
                              Buy eco-friendly products and contribute to a better world from today.
                          </Card.Text>
                    </Card.Body>
                </Card>
              
              </Col>
              <Col>
              <Card className="cardlayout cardInfo" style={{ width: '18rem' }}>
              <Link to="/services">
              <img
                  className="d-block w-100"
                  src={card2}
                  alt="Second card"
               /></Link>
                  <Card.Body>
                      <Card.Title>Trim your bill</Card.Title>
                        <Card.Text>
                             Electricity bill analysis made easy! Give us the details and let us suggest how you can manage your electricity better
                        </Card.Text>
                  </Card.Body>
             </Card>
              </Col>
            </Row>
            <Row>
              <Col>
                  <Card className="cardlayout cardInfo" style={{ width: '18rem' }}>
                  <Link to="/info">
                  <img
                      className="d-block w-100"
                      src={card3}
                      alt="Third card"
                  /></Link>
                      <Card.Body>
                          <Card.Title> The time is NOW </Card.Title>
                            <Card.Text>
                            <br></br>
                                Understand why global sustainability is the need of the hour.
                                <br></br> Learn the importance of renewable resources like wind, solar, biogas and other reusables<br></br>
                            </Card.Text>
                      </Card.Body>
                </Card>
              </Col>
              <Col>
                <Card className="container cardlayout cardInfo" style={{ width: '18rem' }}>
                    <Card.Body>
                            <a className="twitter-timeline " data-theme="light" data-link-color="#19CF86" href="https://twitter.com/Greener18660194?ref_src=twsrc%5Etfw">Tweets by Greener18660194</a>
                    </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>

         

          

          

          
        </div>
    )
  };

export default HomePage;