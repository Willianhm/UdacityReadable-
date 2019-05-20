import React from 'react';

import { formatNumber } from '../utils/helpers';

export default ({ score, handleVoteScore }) => (
    <div className="position-absolute vote-score">
        <small className="mr-2">Score: {formatNumber(score)}</small>
        <button
            className="btn btn-sm text-success"
            onClick={(evt) => {
                evt.preventDefault();
                handleVoteScore('upVote');
            }}>
            Like
            </button>
        <button
            className="btn btn-sm text-danger"
            onClick={(evt) => {
                evt.preventDefault();
                handleVoteScore('downVote');
            }}>
            Deslike
            </button>
    </div>
)