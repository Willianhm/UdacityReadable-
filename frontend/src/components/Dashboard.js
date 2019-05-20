import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import ActionButtons from './NavActionButtons';
import Post from './Post';
import Title from './Title';

class Dashboard extends Component {
    renderPosts(posts) {
        return posts.map((post, index) =>(
            <Link
                to={`/p/${post.id}`}
                key={index} 
                className="rm-decorations">
                <Post 
                    post={post} />
            </Link>
        ));
    }

    render() {
        const { posts } = this.props;
        return(
            <div>
                <ActionButtons />
                <Title text="Timeline"/>
                {posts.length 
                    ? this.renderPosts(posts)
                    : (<p className="text-center text-secondary mt-3">No posts found.</p>)
                }
            </div>
        )
    }
}

function mapStateToProps ({ posts, order }, props) {
    const { category } = props.match.params;
    let newPosts = posts.sort((a,b) => b[order] - a[order]);
    if(category){
        newPosts = newPosts.filter(a => a.category === category);
    }
    return {
        category,
        posts: [...newPosts]
    }
};

export default connect(mapStateToProps)(Dashboard);