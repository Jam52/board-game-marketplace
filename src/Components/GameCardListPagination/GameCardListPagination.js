import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageSkipValue } from '../../store/features/gamesFilter/gamesFilterSlice';
import styles from './GameCardListPagination.module.scss';

const GameCardListPagination = (props) => {
  const dispatch = useDispatch();
  const { gamesDataLength, currentPage } = useSelector(
    (state) => state.gamesFilter,
  );
  const numOfPages = Math.ceil(gamesDataLength / 30);
  let buttons = [];

  for (let i = 0; i < numOfPages; i++) {
    buttons.push(
      <button
        className={`${styles.pagination} ${
          currentPage == i ? styles.current : null
        }`}
        onClick={() => dispatch(setPageSkipValue(i))}
      >
        {i + 1}
      </button>,
    );
  }

  console.log(buttons);
  return <div className={`container ${styles.container}`}>{buttons}</div>;
};

export default GameCardListPagination;
