import React from 'react';
import './App.css';
import GameCardList from './Components/GameCardList/GameCardList';
import { BrowserRouter } from 'react-router-dom';
import mockData from './Components/GameCardList/__tests__/mockData.json';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <GameCardList games={mockData.games} />
      </div>
    </BrowserRouter>
  );
}

export default App;
