import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { handleVoteScore, handleDeletePost } from '../actions/posts';

import Card from './Card';

class Post extends Component {
    handleVoteScore(type){
        const { post } = this.props;
        this.props.handleVoteScore(post, type);
    }

    handleDeletePost(){
        const { post, handleDeletePost, match, history } = this.props;
        handleDeletePost(post);
        if(match.params.post){
            history.push('/');
        }
    }
    
    handleEditPost(){
        const { post, history } = this.props;
        history.push(`/edit/${post.id}`);
    }

    render() {
        const { post } = this.props;
        return (
            <Card 
                item={post}
                onEdit={() => this.handleEditPost()}
                onDelete={() => this.handleDeletePost()} 
                handleVoteScore={(type) => this.handleVoteScore(type)}/>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleVoteScore: (post, type) => dispatch(handleVoteScore(post, type)),
        handleDeletePost: (post) => dispatch(handleDeletePost(post))
    }
}

export default withRouter(connect(null, mapDispatchToProps)(Post));