import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";


// Videos appearing on home page
const ArtList = ({ art }) => {
  // If there are no videos, "No Videos Yet!" message appears
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
              <Image src={picture.cloudURL} />
            </Card.Body >
          </Card >
        ))
      }
    </div >
  );
};

export default ArtList;
