import React from "react";
import { useQuery } from "@apollo/client";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { QUERY_ART } from "../utils/queries";
import ArtList from "../components/ArtList";
// Home page
const Home = () => {
  // Queries videos
  const { loading, data } = useQuery(QUERY_ART);
  const art = data?.art || [];

  return (
    <Container>
      <Row>
        <Col>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <ArtList art={art} title="HEADER TEXT" />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
