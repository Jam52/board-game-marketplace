import React from 'react';
import classes from './GameCard.module.scss';
import fullstarIcon from '../../../images/star.png';
import halfStarIcon from '../../../images/halfstar.png';

const GameCard = (props) => {
  const roundedRaiting = Math.round(props.game.average_user_rating * 2) / 2;
  const raitingArr = [];
  if (roundedRaiting % 1 > 0) {
    raitingArr.push('half');
  }
  for (let i = 0; i < Math.floor(roundedRaiting); i++) {
    raitingArr.push('full');
  }

  const raiting = raitingArr.map((star, index) => {
    return star === 'full' ? (
      <img
        data-test="full-star"
        src={fullstarIcon}
        alt="one star"
        key={index}
      />
    ) : (
      <img
        data-test="half-star"
        src={halfStarIcon}
        alt="half star"
        key={index}
      />
    );
  });

  return (
    <div data-test="component-game-card" className={classes.Container}>
      <h3 className={classes.Title}>{props.game.name}</h3>
      <img
        className={classes.Img}
        src={props.game.thumb_url}
        atl={props.game.name}
      ></img>
      <p>
        Player Count: {props.game.min_players} - {props.game.max_players}
      </p>
      <div className={classes.RatingContainer}>{raiting}</div>
    </div>
  );
};

export default GameCard;
