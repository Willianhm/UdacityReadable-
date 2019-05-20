import axios from 'axios';

const urlServer = "http://localhost:3001/";
const headers = { headers: { 'Authorization': 'whatever-you-want' }};

export function _getCategories(){
    return axios.get(`${urlServer}categories`, headers)
        .then(res => {
            return res.data.categories;
        });
}
    
export function _getPosts(category, id){
    return axios.get(`${urlServer + (category ? category + "/" : "")}posts`, headers)
        .then(res => {
            return res.data;
        });
}

export function _savePost(post, method){
    const url = method === 'post' ? '' : `/${post.id}`;
    return axios[method](`${urlServer}posts${url}`, post, headers)
        .then(res => {
            return res.data;
        });
}

export function _deletePost(id){
    return axios.delete(`${urlServer}posts/${id}`, headers)
        .then(res => {
            return res.data;
        });
}

export function _votePost(post, option){
    return axios.post(`${urlServer}posts/${post.id}`, { option }, headers)
        .then(res => {
            return res.data;
        });
}

export function _getComments(idPost){
    return axios.get(`${urlServer}posts/${idPost}/comments/`, headers)
        .then(res => {
            return res.data;
        });
}

export function _saveComment(comment, method){
    const url = method === 'post' ? '' : `/${comment.id}`;
    return axios[method](`${urlServer}comments${url}`, comment, headers)
        .then(res => {
            return res.data;
        });
}

export function _deleteComment(id){
    return axios.delete(`${urlServer}comments/${id}`, headers)
        .then(res => {
            return res.data;
        });
}

export function _voteComment(comment, option){
    return axios.post(`${urlServer}comments/${comment.id}`, { option }, headers)
        .then(res => {
            return res.data;
        });
}