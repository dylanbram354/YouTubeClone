import React, { Component } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import ReplyModal from './replyModal';
import CommentForm from './commentForm'


class Comments extends Component{
    constructor(props){
        super(props);
        this.state = {
            parents: null,
            replies: null
        }
    }

    async componentDidMount(){
        let parentsAndReplies = await this.getComments(this.props.videoId);
        this.setState({
            parents: parentsAndReplies[0], //array of comment objects
            replies: parentsAndReplies[1] //array of comment objects
        })
    }

    async refreshComments(){
        let parentsAndReplies = await this.getComments(this.props.videoId);
        this.setState({
            parents: parentsAndReplies[0], //array of comment objects
            replies: parentsAndReplies[1] //array of comment objects
        })
    }


    getComments = async (id) => {
        let response = await axios.get(`http://127.0.0.1:8000/comments/get/${id}`);
        let allComments = response.data;
        let parentComments = [];
        let replies = [];
        for (let i=0; i<allComments.length; i++){
            let comment = allComments[i];
            if (comment.replyToId === null){
                parentComments.push(comment);
            }
            else{
                replies.push(comment);
            }
        }
        return [parentComments, replies]
    }

    generateCommentDisplay = () => {
        let parents = this.state.parents.reverse();
        let allReplies = this.state.replies;
        let display = parents.map((parent) => {
            // eslint-disable-next-line
            let replies = allReplies.filter((reply) => {
                return (reply.replyToId == parent.id)
            });
            let repliesDisplay = replies.map((entry) => {
                return(
                    <React.Fragment>
                        <Alert variant='light' className='text-left'>{entry.name} says: {entry.comment}</Alert>
                    </React.Fragment>
                )
            })
            return(
            <React.Fragment>
                <h3 className='text-left'>{parent.name} says...</h3>
                    <Alert variant='dark'>
                        <Alert variant='light' >{parent.comment}</Alert>
                        <div className='container m-2'>
                            <div className='row'>
                                <div className='col-4'>
                                    <Button className='btn btn-success' onClick={() => this.likeComment(parent.id)}>Like ({parent.likes})</Button>
                                </div>
                                <div className='col-4'>
                                    <Button className='btn btn-danger' onClick={() => this.dislikeComment(parent.id)}>Dislike ({parent.dislikes})</Button>
                                </div>
                                <div className='col-4'>
                                    <ReplyModal videoId={this.props.videoId} replyId={parent.id} refresh={this.refreshComments.bind(this)}/>
                                </div>
                            </div>
                        </div>
                        <h3>Replies</h3>
                        {repliesDisplay}
                    </Alert>
            </React.Fragment>
            )
        })
        return display
    }

    likeComment = async (commentId) => {
        try{
            let response = await axios.get(`http://127.0.0.1:8000/comments/like/${commentId}`);
            this.refreshComments()
        }
        catch(err){
            alert(err)
        }
    }

    dislikeComment = async (commentId) => {
        try{
            let response = await axios.get(`http://127.0.0.1:8000/comments/dislike/${commentId}`);
            this.refreshComments()
        }
        catch(err){
            alert(err)
        }
    }

    render(){
        return(
            <div className='mt-4'>
                <CommentForm videoId={this.props.videoId} refresh={this.refreshComments.bind(this)}/>
                {this.state.parents ?
                this.generateCommentDisplay()
                :
                <p>loading comments</p>}
            </div>
        )
    }
}

export default Comments