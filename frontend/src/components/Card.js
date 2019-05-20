import React from 'react';

import { formatDate, formatNumber, formatPlural } from '../utils/helpers';
import CardActions from './CardActions';
import VoteScore from './VoteScore';

export default ({ item, onEdit, onDelete, handleVoteScore }) => (
    <div
        className="card mb-2">
        <div className="row no-gutters">
            <div className="col-12">
                <div className="card-body">
                    <div className="mb-0">
                        {item.category && <i><small>#{item.category}</small></i>}
                        <CardActions
                            onEdit={onEdit}
                            onDelete={onDelete} />
                    </div>
                    <h6 className="card-title mb-0">
                        {item.title}
                    </h6>
                    <h6 className="mb-1">
                        @{item.author}
                        <small className="ml-2">{item.body}</small>
                    </h6>

                    <div className="card-text mb-0 text-muted position-relative">
                        <small>{formatDate(item.timestamp)}</small>
                        {item.commentCount &&
                            <small className="ml-4">
                                {formatNumber(item.commentCount)} {formatPlural('comment', 'comments', item.commentCount)}
                            </small>
                        }
                        <VoteScore score={item.voteScore} handleVoteScore={handleVoteScore} />
                    </div>
                </div>
            </div>
        </div>
    </div>
)