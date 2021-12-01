import React, { useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button';
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container'
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import ADD_ART from "../../utils/mutations";
import Auth from "../../utils/auth";
// Upload page using cloudinary
function CloudinaryUploadWidget() {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [URL, setURL] = useState("");
  const [blurb, setBlurb] = useState("")

  const [addArt, { error }] = useMutation(ADD_ART);
  // Upload widget courtesy of cloudinary
  const myWidget = window.cloudinary.createUploadWidget(
    {
      cloudName: "dq3jfvis9",
      uploadPreset: "cyajgdzc",
    },
    (error, result) => {
      if (!error && result && result.event === "success") { // If video upload is a success, its logged in console
        console.log("Done! Here is the video info: ", result.info);
        // When upload is complete, cloudinary gives url for video
        setURL(result.info.secure_url); // Set URL state for GraphQL database, adds url to database
      }
    }
  );
  // When upload button is clicked, myWidget is called to open
  const uploadClick = () => {
    myWidget.open();
  };
  // Submit form for title & video URL
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      addArt({
        variables: {
          title: title, // title fromm input field
          cloudURL: URL, // URL from cloudinary upload
          genre: genre,
          blurb: blurb
        },
      });
      setTitle(""); // Input field goes back to blank on submit
      window.location.assign('/'); // On submit, user is taken back to the home page
    } catch (err) {
      console.error(err); // If there is an error its logged in the console
    }
  };

  return (
    <div>
      {Auth.loggedIn() ? (
    <Container className="upload-container justify-content-md-center">
      <Row className="justify-content-md-center upload-padding-top">
        <Form.Label>Upload Your Art</Form.Label>
      </Row>
      <Row className="justify-content-md-center">
        <button
          id="upload_widget"
          onClick={uploadClick}
          className="cloudinary-button button6"
        >
          Upload
        </button>
      </Row>
      <Form>
        <Row className="justify-content-md-center">
          <Col sm={5}>
            <Form.Group as={Col} className="upload-label" controlId="formGridEmail">
              <Form.Label  >Artwork Title</Form.Label>
              <Form.Control
                onChange={(event) => {
                  setTitle(event.target.value);
                }}
                value={title}
              />
              <div>
                <select onChange={(event) => { setGenre(event.target.value) }} name="genre" id="level-select">
                  <option value="acrylic">Acrylic Painting</option>
                  <option value="ink">Pen & Ink</option>
                  <option value="mspaint">MS Paint</option>
                  <option value="sketch">Sketch Book</option>
                  <option value="misc">Misc</option>
                </select>
              </div>
              <div>
                <textarea type="text" placeholder="description" onChange={(event) => { setBlurb(event.target.value) }} />
              </div>
            </Form.Group>
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <button className='button6' type="submit" onClick={handleFormSubmit}>
            Submit
          </button>
        </Row>
      </Form>
    </Container>
    ) : (
      <p>
        You need to be logged in to upload a video. Please{" "}
        <Link to="/login">login</Link>
      </p>
    )}
    </div>
  );
}

export default CloudinaryUploadWidget;