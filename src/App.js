import React from 'react';
import logo from './logo.svg';
import './App.css';
import MainNavBar from './Components/Navigation/MainNavBar/MainNavBar';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MainNavBar />
      </div>
    </BrowserRouter>
  );
}

export default App;
