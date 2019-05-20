import React, { Component } from 'react';
import { connect } from 'react-redux';

import { handleVoteScore, handleDeleteComment } from '../actions/comments';

import Card from './Card';
import NewComment from './NewComment';

class Comment extends Component {
    state = {
        isEditing: false
    }

    handleVoteScore(type){
        const { comment } = this.props;
        this.props.dispatch(handleVoteScore(comment, type));
    }

    handleDeletePost(){
        const { comment, dispatch } = this.props;
        dispatch(handleDeleteComment(comment));
    }
    
    handleEditPost(){
        const { isEditing } = this.state;
        this.setState((state) => ({ ...state, isEditing: !isEditing }));
    }

    render() {
        const { comment } = this.props;
        const { isEditing } = this.state;
        return (
            <div>
                {
                    isEditing 
                    ? <NewComment 
                        isEditing={true}
                        comment={comment}
                        cancelEdit={()=> this.handleEditPost()}/>
                    : <Card 
                        item={comment}
                        onEdit={()=> {this.handleEditPost()}}
                        onDelete={() => {this.handleDeletePost()}}
                        handleVoteScore={(type) => this.handleVoteScore(type)}/>
                }
            </div>
        )
    }
}

export default connect()(Comment);