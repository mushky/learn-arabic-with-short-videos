import React, { useState, useEffect } from 'react'
import { Container } from "react-bootstrap"
import { Link } from 'react-router-dom'

import CardItem from './CardItem'

import BeCarefulSanad from '../../test-data/our-family-life-be-careful-sanad'

import firebase from '../../firebase'

const CardList = (props) => {
  const [currentCard, setCurrentCard] = useState(0)
  const [selectedDeck, setSelectedDeck] = useState(BeCarefulSanad)

  useEffect(() => {
    firebase
      .firestore()
      .collection('flash_card')
      .onSnapshot((snapshot) => {
        const flashCards = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))

        const videoFlashCards = []

        flashCards.filter((flashCard) => {
          if (flashCard.video_id === props.match.params.id) {
            videoFlashCards.push(flashCard)
          } else {
          }
        })

        if (videoFlashCards.length > 0) {
          setSelectedDeck(videoFlashCards)
        } else {
          setSelectedDeck(BeCarefulSanad)
        }
      
      })
  },[])

  const nextCard = () => {
    if (currentCard >= selectedDeck.length - 1)
      setCurrentCard(0)

    if (currentCard < selectedDeck.length - 1) 
      setCurrentCard(currentCard + 1)
  }

  return(
    <div>
      <Container>
        <Link to="/">Back</Link>
      </Container>
      <CardItem 
        front={selectedDeck[currentCard].front} 
        back={selectedDeck[currentCard].back} 
        nextCard={nextCard}
      />
    </div>
  )
}

export default CardList;