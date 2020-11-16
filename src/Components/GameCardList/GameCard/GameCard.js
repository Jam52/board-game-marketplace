import React from 'react';
import classes from './GameCard.module.scss';
import fullstarIcon from '../../../images/star.png';
import halfStarIcon from '../../../images/halfstar.png';
import playerCountIcon from '../../../images/playercount.png';
import playTimeIcon from '../../../images/time.png';

const GameCard = (props) => {
  const roundedRaiting = Math.round(props.game.average_user_rating * 2) / 2;
  const ratingArr = [];

  for (let i = 0; i < Math.floor(roundedRaiting); i++) {
    ratingArr.push('full');
  }
  if (roundedRaiting % 1 > 0) {
    ratingArr.push('half');
  }

  const raiting = ratingArr.map((star, index) => {
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
    <div data-test="component-game-card" className={classes.gamecard}>
      <h3 className={classes.gamecard_title}>{props.game.name}</h3>

      <div className={classes.gamecard_img}>
        <img src={props.game.images.small} atl={props.game.name} />
      </div>
      <div className={classes.gamecard_information}>
        <div>
          <img src={playerCountIcon} alt="player count"></img>{' '}
          <p data-test="player-count">
            {props.game.min_players}-{props.game.max_players}
          </p>
        </div>
        <div>
          <img src={playTimeIcon} alt="play time" />
          <p data-test="play-time">
            {props.game.min_playtime}-{props.game.max_playtime} mins
          </p>
        </div>
      </div>

      <div className={classes.gamecard_raiting}>
        <p>{props.game.average_user_rating.toFixed(1)}</p>
        <div>{raiting}</div>
      </div>
    </div>
  );
};

export default GameCard;
