import React from 'react';
import FaTrash from 'react-icons/lib/fa/trash';
import FaPen from 'react-icons/lib/fa/pencil';

export default props => (
    <div className="float-right">
        <button
            className="btn btn-sm btn-icon text-primary"
            onClick={(evt) => {
                evt.preventDefault();
                props.onEdit();
            }}>
            <FaPen />
        </button>
        <button
            className="btn btn-sm btn-icon text-danger"
            onClick={(evt) => {
                evt.preventDefault();
                props.onDelete();
            }}>
            <FaTrash />
        </button>
    </div>
)