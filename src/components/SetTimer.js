import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

const SetTimer = ({ title, count, handleDecrease, handleIncrease, type }) => {
  return (
    <div className="timer-container">
      <h2>{title}</h2>
      <div className="flex actions-wrapper">
        <button onClick={() => handleDecrease(type)}>
          <FontAwesomeIcon icon={faMinus} />
        </button>
        <span>{count}</span>
        <button onClick={() => handleIncrease(type)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
};

export default SetTimer;
