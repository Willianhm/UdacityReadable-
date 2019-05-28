import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'

import { handleAddPost, handleEditPost } from '../actions/posts';
import { closeModal } from '../actions/modal';

class NewPost extends Component {
    state = {
        title: '',
        body: '',
        author: '',
        category: '',
        showError: false
    };

    componentDidUpdate(newProps) {
        if(newProps.post && !newProps.post.id && this.props.post && this.props.post.id){ // WHEN RECEIVE POST FROM PARAM FOR EDIT
            this.setPost();
        }
    }

    setPost() {
        const { title, body, author, category } = this.props.post;
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
            const { post } = this.props;
            const newPost = {
                title,
                body,
                author,
                category,
                timestamp: Date.now(),
                voteScore: 1
            };
            if (post && post.id) {
                newPost.id = post.id;
                newPost.voteScore = post.voteScore;
                this.props.handleEditPost(newPost).then(() => {
                    this.closeModal();
                });
            } else {
                this.props.handleAddPost(newPost).then(() => {
                    this.closeModal();
                });
            }
        }
    }

    closeToast = () => {
        this.setState(() => ({ showError: false }));
    }

    closeModal = () => {
        this.props.closeModal();
    }

    render() {
        const { categories, isEditing, isOpen } = this.props;
        const { title, body, author, category, showError } = this.state;
        return (
            <div className={`modal ${isOpen ? 'fade show' : ''}`} tabIndex="-1" role="dialog" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">Edit Post</h5>
                            <button type="button" className="close" aria-label="Close"
                                onClick={() => this.closeModal()}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
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
                                    <input
                                        type="text"
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
                                        {isEditing ? "Save" : "Send"}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-light ml-2"
                                        onClick={this.closeModal}>
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
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps({ posts, categories, modal }) {
    let post = {};
    if (modal.param && posts.length) {
        post = posts.filter(post => post.id === modal.param.id)[0];
    }
    return {
        categories,
        isEditing: modal.param !== null,
        post,
        isOpen: modal.isOpen
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleEditPost: (post) => dispatch(handleEditPost(post)),
        handleAddPost: (post) => dispatch(handleAddPost(post)),
        closeModal: () => dispatch(closeModal())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(NewPost));