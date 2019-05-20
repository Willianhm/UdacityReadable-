import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { handleGetComments } from '../actions/comments';

import Post from './Post';
import Comment from './Comment';
import NewComment from './NewComment';

class PostPage extends Component {
    componentDidMount(){
        this.props.dispatch(handleGetComments(this.props.match.params.post));
    }

    renderComment(){
        const { comments } = this.props;
        return comments.map(c => 
            <Comment 
                key={c.id}
                comment={c} />
        );
    }

    render() {
        const { post } = this.props;

        if (!post) {
            return (<p className="text-center text-secondary mt-3">Post not found.</p>)
        }

        return (
            <div className="mt-2">
                <Post
                    post={post}
                    isInfo={true} />
                <div className="pl-5 pr-5">
                    {this.renderComment()}
                    <NewComment postId={post.id} />
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, comments }, props) {
    return {
        post: posts.length ? posts.filter(post => post.id === props.match.params.post)[0] : null,
        comments: comments.sort((a,b) => b.voteScore - a.voteScore)
    }
}

export default withRouter(connect(mapStateToProps)(PostPage));