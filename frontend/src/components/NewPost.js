import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom'

import { handleAddPost, handleEditPost } from '../actions/posts';

import Title from './Title';    

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: '',
        toHome: false,
        showError: false
    };

    componentDidMount(){
        if(this.props.post.id){
            this.setPost(this.props.post);
        }
    }
    
    componentDidUpdate(newProps){
        if(newProps.post.id && newProps.post.id !== this.props.post.id){
            this.setPost(newProps.post);
        }
    }

    setPost(post){
        const { title, body, author, category } = post;
        this.setState(() => ({
            title,
            body,
            author,
            category
        }));
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState(() => ({ [name]: value }));
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { title, body, author, category } = this.state;
        if (!title || !body || !author || !category) {
            this.setState(() => ({ showError: true }));
        } else {
            const { post } = this.props.match.params;
            const newPost = {
                title, 
                body, 
                author, 
                category,
                timestamp: Date.now(),
                voteScore: 1
            };
            if(post){
                newPost.id = post;
                this.props.handleEditPost(newPost).then(() => {
                    this.props.history.goBack();
                });
            }else{
                this.props.handleAddPost(newPost).then(() => {
                    this.setState(() => ({
                        toHome: true
                    }));
                });
            }
        }
    }

    closeToast = () =>{
        this.setState(() => ({ showError: false }));
    }

    cancel = () => {
        this.props.history.goBack();
    }

    render() {
        const { categories, isEditing } = this.props;
        const { title, body, author, category, showError, toHome } = this.state;
        if(toHome){
            return <Redirect to='/' />;
        }
        return (
            <div>
                <Title text={`${isEditing ? "Edit" : "New"} Post`}/>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-row">
                        <div className="form-group col-md-6">
                            <input
                                type="text"
                                className="form-control"
                                name="author"
                                id="author"
                                placeholder="Author"
                                onChange={this.handleChange}
                                value={author}
                            />
                        </div>
                        <div className="form-group col-md-6">
                            <select
                                className="form-control"
                                name="category"
                                id="category"
                                placeholder="Category"
                                onChange={this.handleChange}
                                value={category}>
                                <option value="" disabled>Category</option>
                                {categories.map(category => (
                                    <option 
                                        key={category.path}
                                        value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <input
                            type="text"
                            className="form-control"
                            name="title"
                            id="title"
                            placeholder="Title"
                            onChange={this.handleChange}
                            value={title} />
                    </div>
                    <div className="form-group">
                        <textarea
                            className="form-control"
                            name="body"
                            id="body"
                            rows="3"
                            placeholder="Comment..."
                            onChange={this.handleChange}
                            value={body} />
                    </div>
                    <div className="text-right">
                        <button
                            type="submit"
                            className="btn btn-outline-success">
                            { isEditing ? "Save" : "Send"}
                        </button>
                        <button
                            type="button"
                            className="btn btn-light ml-2"
                            onClick={this.cancel}>
                            Cancel
                        </button>
                    </div>
                </form>
                {
                    showError && (
                        <div className="fixed-top">
                            <div 
                                className="toast fade show mx-auto" 
                                role="alert" 
                                aria-live="assertive" 
                                aria-atomic="true">
                                <div className="toast-header">
                                    <strong className="mr-auto">Error...</strong>
                                    <button 
                                        type="button" 
                                        className="ml-2 mb-1 close" 
                                        data-dismiss="toast" 
                                        aria-label="Close"
                                        onClick={this.closeToast}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="toast-body">
                                    You need to enter all fields.
                                </div>
                            </div>
                        </div>
                    )
                }
            </div>
        )
    }
}

function mapStateToProps({ posts, categories }, props) {
    let post = {};
    if(props.match.params.post && posts.length){
        post = posts.filter(post => post.id === props.match.params.post)[0];
    }
    return {
        categories,
        isEditing: props.match.params.post !== undefined,
        post
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditPost: (post) => dispatch(handleEditPost(post)),
        handleAddPost: (post) => dispatch(handleAddPost(post))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));