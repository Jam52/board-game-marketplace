import React from 'react';
import GameCard from './GameCard/GameCard';
import classes from './GameCardList.module.scss';
import Spinner from '../Spinner/Spinner';

const GameCardList = (props) => {
  let gameList = null;
  if (props.games.length > 0) {
    gameList = props.games.map((game) => {
      return <GameCard game={game} key={game.id} />;
    });
  }

  const content = props.loading ? (
    <div className={classes.sinnerContainer}>
      <Spinner />
    </div>
  ) : (
    <div data-test="component-game-card-list" className={classes.container}>
      {gameList}
    </div>
  );

  return (
    <div data-test="component-game-card-list">
      {props.loading ? (
        <div className={classes.sinnerContainer}>
          <Spinner />
        </div>
      ) : (
        <div className={classes.container}>{gameList}</div>
      )}
    </div>
  );
};

export default GameCardList;
