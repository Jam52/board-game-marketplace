import React from 'react';
import GameCard from './GameCard/GameCard';
import classes from './GameCardList.module.scss';
import Spinner from '../Spinner/Spinner';
import { useSelector } from 'react-redux';

const GameCardList = (props) => {
  const { gamesData, loading } = useSelector((state) => state.gamesFilter);

  let gameList = null;
  if (gamesData.length > 0) {
    gameList = gamesData.map((game) => {
      return <GameCard game={game} key={game.id} />;
    });
  }

  return (
    <div data-test="component-game-card-list">
      {loading ? (
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
