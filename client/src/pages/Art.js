import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { QUERY_SINGLE_ART } from "../utils/queries";
import { REMOVE_ART } from "../utils/mutations";
// import { VIDEO_METRICS, UPDATE_LIKES, UPDATE_DISLIKES } from "../utils/mutations";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Auth from "../utils/auth";
// Single video page
const SingleVideo = () => {
  const { artId } = useParams();

  const { loading, data } = useQuery(QUERY_SINGLE_ART, {
    variables: { artId: artId },
  });
  console.log(data)

  const [deleteVideo, { error }] = useMutation(REMOVE_ART);
  
  if (loading) {
    return <div>Loading...</div>;
  } else {
    const video = data?.singleArt || {};
    

  // Function to delete video
  async function deleteFunction(artId) {
    const token = Auth.loggedIn() ? Auth.getToken() : null;
    if (!token) { // if not logged in, user can't delete video
      return false;
    }
    try {
      const { data } = await deleteVideo({
        variables: { artId }
      })
    } catch (err) {
      console.log(err)
    }
    if (!token) {
      return false;
    }
  }
  // On click, video is deleted and user is taken back to the home page
  const deleteClick = () => {
    deleteFunction(artId);
    window.location.assign('/');
  };



   

    return (
      <div>
        <Container>
          <Card className="text-center my-3">
            <Card.Header as="h2" className="video-title">{video.title}</Card.Header>
            <Card.Body className="video-body">
              <Card.Title className="roboto-font">{video.publishDate}</Card.Title>
              <Card.Title className="roboto-font"></Card.Title>
                <img src={video.cloudURL} alt="nuthin yet" />
                {Auth.loggedIn() ? (
                    <div>
                    <button
                      className="mb-3 button6"
                      type="submit"
                      onClick={deleteClick}
                    >
                      Delete
                    </button>
                  </div>
                ) : (<div></div>)}



            </Card.Body >
          </Card >
        </Container >
      </div >
    );
  }
};

export default SingleVideo;
