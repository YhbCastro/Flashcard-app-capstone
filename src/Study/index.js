// The Study screen is displayed at /decks/:deckId/study.

// The Study screen has the following features:

// The path to this screen should include the deckId (i.e., /decks/:deckId/study).
// You must use the readDeck() function from src/utils/api/index.js to load the deck that is being studied.
// There is a breadcrumb navigation bar with links to home /, followed by the name of the deck being studied and finally the text Study (e.g., Home/Rendering In React/Study).
// The deck title (i.e., "Study: Rendering in React" ) is shown on the screen.
// Cards are shown one at a time, front-side first.
// A button at the bottom of each card "flips" it to the other side.
// After flipping the card, the screen shows a next button (see the "Next button" section below) to continue to the next card.
// After the final card in the deck has been shown, a message (see the "Restart prompt" section below) is shown offering the user the opportunity to restart the deck.
// If the user does not restart the deck, they should return to the home screen.
// Studying a deck with two or fewer cards should display a "Not enough cards" message (see the "Not enough cards" section below) and a button to add cards to the deck.

  
import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom';
import { readDeck } from '../utils/api/index';

function Study() {
  const { deckId } = useParams();

  console.log(deckId);
  const [cardFront, setCardFront] = useState(true);
  const [cardAmount, setCardAmount] = useState(0);
  const [cards, setCards] = useState([]);
  const [deck, setDeck] = useState([]);

  useEffect(() => {
    setCards({});
    const abortController = new AbortController();
    async function loadData() {
      try {
        const data = await readDeck(deckId, abortController.signal);
        setDeck(data);
        setCards(data.cards);
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Aborted!');
        } else throw error;
      }
    }
    loadData();
    return () => abortController.abort();
  }, [deckId]);

  function cardFlip() {
    setCardFront(!cardFront);
  }
  const history = useHistory();

  function cardSwitch() {
    if (cardAmount + 1 < cards.length) {
      setCardAmount(cardAmount + 1);
      setCardFront(true);
    } else {
      const windowMsg = window.confirm(`Restart cards?
      
      Click "cancel" to return to the home page. `);
      if (windowMsg) {
        setCardAmount(0);
        setCardFront(true);
      } else history.push('/');
    }
  }

  const BreadCrumbBar = () => {
    return (
      <div className="navigation  row-col">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item" key="0">
              <Link to="/">
                <span className="oi oi-home" /> Home
              </Link>
            </li>
            <li className="breadcrumb-item" key="1">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page" key="2">
              Study
            </li>
          </ol>
        </nav>
      </div>
    );
  };

  if (cards.length > 2) {
    return (
      <div>
        <BreadCrumbBar />
        <h2>Study: {deck.name}</h2>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cardAmount + 1} of {cards.length}
            </h5>
            <p className="card-text">
              {cardFront
                ? `${cards[cardAmount].front}`
                : `${cards[cardAmount].back}`}
            </p>
            <button className="btn btn-secondary" onClick={cardFlip}>
              Flip
            </button>{' '}
            &nbsp;
            {cardFront ? (
              ' '
            ) : (
              <button className="btn btn-primary" onClick={cardSwitch}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <BreadCrumbBar />
      <h2>Study: {deck.name}</h2>
      <div className="card border-danger">
        <div className="card-body text-danger">
          <h5 className="card-title">Not Enough Cards.</h5>
          <p className="card-text">
            You need at least 3 cards to study. There are {cards.length} cards
            in this deck.
          </p>
          <Link to={`/decks/${deckId}/cards/new`} className="btn btn-primary">
            <span className="oi oi-plus" /> Add Cards
          </Link>
        </div>
      </div>
    </div>
  );
}
export default Study;