import React from 'react';
import GameCard from './GameCard/GameCard';
import classes from './GameCardList.module.scss';

const GameCardList = (props) => {
  let gameList = null;
  if (props.games.length > 0) {
    gameList = props.games.map((game) => {
      return <GameCard game={game} key={game.id} />;
    });
  }

  return (
    <div data-test="component-game-card-list" className={classes.Container}>
      {gameList}
    </div>
  );
};

export default GameCardList;
