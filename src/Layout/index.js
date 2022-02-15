import React from 'react';
import Header from './Header';
import NotFound from './NotFound';
import Home from '../Home/Home';
import Study from '../Study/Study';
import CreateDeck from '../Deck/CreateDeck';
import EditDeck from '../Deck/EditDeck';
import DeckView from '../Deck/DeckView';
import AddCards from '../Deck/AddCards';
import EditCard from '../Deck/EditCard';
import { Switch, Route } from 'react-router-dom';

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path={'/decks/:deckId/study'}>
            <Study />
          </Route>
          <Route path={'/decks/new'}>
            <CreateDeck />
          </Route>
          <Route path={'/decks/:deckId/cards/:cardId/edit'}>
            <EditCard />
          </Route>
          <Route path={'/decks/:deckId/cards/new'}>
            <AddCards />
          </Route>
          <Route path={'/decks/:deckId/edit'}>
            <EditDeck />
          </Route>
          <Route path={'/decks/:deckId'}>
            <DeckView />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;