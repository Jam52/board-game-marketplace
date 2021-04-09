import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPageSkipValue } from '../../store/features/gamesFilter/gamesFilterSlice';
import styles from './GameCardListPagination.module.scss';
import Aux from '../../hoc/Auxillary';

const GameCardListPagination = (props) => {
  const dispatch = useDispatch();
  const { gamesDataLength, currentPage } = useSelector(
    (state) => state.gamesFilter,
  );

  const [buttonsToDisplayStart, setButtonsToDisplayStart] = useState(1);

  const numOfPages = Math.ceil(gamesDataLength / 30);
  let buttons = [];

  for (let i = 0; i < numOfPages; i++) {
    buttons.push(
      <button
        key={i}
        className={`${styles.pagination} ${
          currentPage == i ? styles.current : null
        }`}
        onClick={(event) => updatePageSkipValueHandler(i, event)}
      >
        {i + 1}
      </button>,
    );
  }

  const buttonsToDisplaySlice = buttons.slice(
    buttonsToDisplayStart,
    buttonsToDisplayStart + 5,
  );

  const updatePageSkipValueHandler = (value, event) => {
    event.preventDefault();
    dispatch(setPageSkipValue(value));

    const lastButtonValue = Number(
      buttonsToDisplaySlice[buttonsToDisplaySlice.length - 1].key,
    );
    const firstButtonValue = Number(buttonsToDisplaySlice[0].key);

    if (value === 0) {
      setButtonsToDisplayStart(1);
    }
    const lastPageButtonValue = Number(buttons[buttons.length - 1].key);
    if (value === lastPageButtonValue) {
      setButtonsToDisplayStart(lastPageButtonValue - 5);
    }
    if (lastButtonValue === value) {
      setButtonsToDisplayStart(buttonsToDisplayStart + 3);
    }
    if (firstButtonValue === value && value !== 1) {
      setButtonsToDisplayStart(buttonsToDisplayStart - 3);
    }
  };

  const buttonsToDisplay =
    buttons.length > 9 ? (
      <Aux>
        {buttons[0]} <div>/</div> {buttonsToDisplaySlice}
        <div>/</div>
        {buttons[buttons.length - 1]}
      </Aux>
    ) : (
      buttons
    );

  return (
    <div>
      {gamesDataLength > 30 ? (
        <div className={`container ${styles.container}`}>
          <button
            disabled={currentPage === 0}
            className={`${styles.pagination}`}
            onClick={(event) => {
              if (currentPage > 0) {
                updatePageSkipValueHandler(currentPage - 1, event);
              }
            }}
          >
            prev
          </button>
          {buttonsToDisplay}
          <button
            disabled={currentPage === buttons.length - 1}
            className={`${styles.pagination}`}
            onClick={(event) =>
              updatePageSkipValueHandler(currentPage + 1, event)
            }
          >
            next
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default GameCardListPagination;
