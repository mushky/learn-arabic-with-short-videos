import React, {useState} from 'react'

const Card = (props) => {
  const [flip, setFlip] = useState(false)

  const flipCard = () => {
    setFlip(!flip)
  }

  const nextCardAndFlip = () => {
    props.nextCard();
    setFlip(false);
  }
  
  return( 
    <div>
        <section>
          { !flip && 
            <article className="flashCard" onClick={() => flipCard()}>
              <header className="cards-header">
                <h1>{props.front}</h1>
              </header>
            </article>      
          }
          
          { flip && 
            <article className="flashCard">
              <header className="cards-header">
                <h1>{props.back}</h1>
              </header>
            </article>
          }
          { flip && 
            <div className="confidenceButtons">
              <button className="confidence" onClick={() => nextCardAndFlip()}>0</button>
              <button className="confidence" onClick={() => nextCardAndFlip()}>1</button>
              <button className="confidence" onClick={() => nextCardAndFlip()}>2</button>
              <button className="confidence" onClick={() => nextCardAndFlip()}>3</button>
              <button className="confidence" onClick={() => nextCardAndFlip()}>4</button>
            </div>
          }
        </section>
      

    </div>

  )
}

export default Card