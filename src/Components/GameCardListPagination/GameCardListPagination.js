import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './GameCardListPagination.module.scss';

const GameCardListPagination = (props) => {
  const dispatch = useDispatch();
  const { gamesData } = useSelector((state) => state.gamesFilter);
  const numOfPages = Math.ceil(gamesData.length / 30);
  console.log(numOfPages);
  return <div className={`container ${styles.container}`}></div>;
};

export default GameCardListPagination;
