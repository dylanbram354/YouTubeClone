import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

class Comment extends Component{
    constructor(props){
        super(props);
        this.state = {
            comments: "",
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
    }

    render() { 
        return ( 
            <div className="container">
                <Form>
                    <div className="form-group" onSubmit={this.handleSubmit}> 
                        <label for="comment">Comment:</label>
                        <Form.Control type="text" rows="5" id="comment" name="searchQuery" value={this.state.comments} onChange={this.handleChange}/>
                        <Button variant="primary" type="submit">Comment</Button>
                    </div>
                </Form>
            </div>
         );
    }
}

export default Comment;