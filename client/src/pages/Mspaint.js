import React from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import Card from "react-bootstrap/Card";
import { QUERY_MSPAINT } from "../utils/queries"

// Videos appearing on home page
const Mspaint = () => {
  // If there are no videos, "No Videos Yet!" message appears
  const genre = "mspaint"
  const { loading, data } = useQuery(QUERY_MSPAINT, {
      variables: { genre: genre }
  });

  const art = data?.msPaint || [];
  console.log(data)

  if (!art.length) {
    return <h3 className="roboto-font2">No Art Yet!</h3>;
  }
  // Updates video views on page reload
  

  return (
    <div>
      {art &&
        art.map((picture) => (
          <Card className="text-center my-3" key={picture._id}>
            <Card.Header as="h2" className="video-title">{picture.title}</Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font"><i className="fas fa-calendar-alt"></i>  {picture.publishDate}</Card.Title>
              <Link to={`/videos/${picture._id}`}>
              <img src={picture.cloudURL} alt={picture.title} />
              </Link>
            </Card.Body >
          </Card >
        ))
      }
    </div >
  );
};

export default Mspaint;
