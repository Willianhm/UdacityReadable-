import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleAddComment, handleEditComment } from '../actions/comments';

class newComment extends Component {
    constructor(props){
        super(props);
        this.state = {
            author: '',
            body: '',
            isEditing: false
        };
    }

    componentDidMount(){
        const { comment } = this.props;
        if(comment){
            this.setState((state) => ({
                ...state,
                author: comment.author,
                body: comment.body
            }));
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState(state => ({ ...state, [name]: value }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { author, body } = this.state;
        const { dispatch, postId, comment } = this.props;
        const newComment = {
            body,
            author, 
            timestamp: Date.now(),
            parentId: postId,
            voteScore: 1
        }
        if(comment){
            newComment.id = comment.id;
            newComment.voteScore = comment.voteScore;
            this.props.cancelEdit();
            dispatch(handleEditComment(newComment));
        }else{
            dispatch(handleAddComment(newComment));
            this.setState((state) => ({ ...state, author: '', body: '' }));
        }
    }

    render() {
        const { isEditing, cancelEdit } = this.props;
        const { author, body } = this.state;
        return (
            <div className="card mb-2">
                <form 
                    className="p-3"
                    onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control mb-1"
                            name="author"
                            id="author"
                            placeholder="Author"
                            onChange={this.handleChange}
                            value={author}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="body"
                            id="body"
                            placeholder="Comment..."
                            onChange={this.handleChange}
                            value={body}
                            required
                            />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="btn btn-sm btn-outline-success">
                            { isEditing ? "Save" : "Comment"}
                        </button>
                        {isEditing && 
                            <button
                                type="button"
                                className="btn btn-sm btn-light ml-2"
                                onClick={cancelEdit}>
                                Cancel
                            </button>
                        }
                    </div>
                </form>
            </div>
        )
    }
}

export default connect()(newComment);