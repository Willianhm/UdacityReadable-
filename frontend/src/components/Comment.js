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
        this.props.handleVoteScore(comment, type);
    }

    handleDeletePost(){
        this.props.handleDeleteComment(this.props.comment);
    }
    
    handleEditPost(){
        const { isEditing } = this.state;
        this.setState(() => ({ isEditing: !isEditing }));
    }

    render() {
        const { comment } = this.props;
        const { isEditing } = this.state;
        return (
            <div>
                {
                    isEditing 
                    ? <NewComment 
                        isEditing
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

const mapDispatchToProps = dispatch => {
    return {
        handleVoteScore: (comment, type) => dispatch(handleVoteScore(comment, type)),
        handleDeleteComment: (comment) => dispatch(handleDeleteComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(Comment);