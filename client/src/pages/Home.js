import React from "react";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Home page
const Home = () => {


  return (
    <Container>
      <Row>
        <Col>
        <h1 className="home-welcome">Welcome to my art portfolio</h1>
        <h5 className="home-p">
          My name is Aidan Rich. I am an artist and web developer. This is my personal artwork from over the years, organized roughly by medium. Feel free to click around and take a look.
        </h5>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
