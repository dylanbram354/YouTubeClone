import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comment: "",
            name: "",
        }
    }

    addComment = async () => {
        let comment = {
            name: this.state.name,
            comment: this.state.comment,
            date: new Date(),
            videoId: this.props.videoId,
        }
        console.log(comment);
        try {
            await axios.post('http://127.0.0.1:8000/comments/post', comment);
            this.setState({
            });
        }
        catch (err) {
            console.log(err);
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        alert("make API call")
        this.addComment();
    }

    render() { 
        return ( 
            <div className="container">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group  controlId="name">  
                        <Form.Label for="name">Name:</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" onChange={this.handleChange} value={this.state.name}/>
                    </Form.Group>
                    <Form.Group controlId="comment">
                        <Form.Label for="comment">Comment</Form.Label>
                        <Form.Control type="text" placeholder="Comment..." value={this.state.comment} onChange={this.handleChange}/>
                    </Form.Group>             
                        <Button variant="primary" type="submit">Add Comment</Button>
                </Form>
            </div>
         );
    }
}

export default Comment;