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
    <div data-test="component-game-card" className={classes.Container}>
      <div className={classes.Title}>
        <h3 className={classes.Title}>{props.game.name}</h3>
      </div>

      <div className={classes.Img}>
        <img src={props.game.images.small} atl={props.game.name} />
      </div>
      <div className={classes.Info}>
        <div><img src={playerCountIcon} alt='player count'></img> <p className={classes.PlayerCount} data-test="player-count">
        {props.game.min_players} - {props.game.max_players}
      </p></div>
      <div>
        <img src={playTimeIcon}/>
        <p data-test="play-time">{props.game.min_playtime} - {props.game.max_playtime}</p>
      </div>

      </div>
     
      <div className={classes.RatingContainer}>
        <p>{props.game.average_user_rating.toFixed(1)}</p>
        <div>{raiting}</div>
      </div>
    </div>
  );
};

export default GameCard;
