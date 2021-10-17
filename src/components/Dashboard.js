import React, { useState, useEffect } from "react"
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

import firebase from '../firebase'

const Dashboard = () => {
  const [videos, setVideos] = useState([])
  const [error, setError] = useState("")
  const { currentUser, logout } = useAuth()
  
  const history = useHistory()

  useEffect(() => {
    firebase
      .firestore()
      .collection('videos')
      .onSnapshot((snapshot) => {
        const newVideos = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setVideos(newVideos)
      })
  },[])

  async function handleLogout(){
    setError("")

    try {
      await logout()
      history.push("/login")
    } catch {
      setError("Failed to log out")
    }
  }

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Learn with Short Videos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item><Link to="/update-profile">Update Profile</Link></NavDropdown.Item>
              <NavDropdown.Item href="#">Vocabulary</NavDropdown.Item>
              <NavDropdown.Item href="#">Flash Cards</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout} href="#">Log Out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Container>
        <h1>Videos</h1>
        {videos.map((video) => 
          <div key={video.id}>
            <iframe
              width="540"
              height="315"
              src={video.embed_url}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen              
            >
            </iframe>
            <p><Link to={{pathname:`/deck/${video.id}`}}>View Flashcards</Link></p>
          </div>
        )}
      </Container>
    </>
  )
}

export default Dashboard
