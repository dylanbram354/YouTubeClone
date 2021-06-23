import React, { Component } from 'react'

class Comment extends component{
    constructor(props){
        super(props);
        this.state = {
            comments = "",
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.comments(this.state.comments)
    }

    render() { 
        return ( 
            <div class="container">
                <Form>
                    <div class="form-group" onSubmit={this.handleSubmit}> 
                        <label for="comment">Comment:</label>>
                        <Form.Control type="text" rows="5" id="comment" name="searchQuery" value={this.state.comments} onChange={this.handleChange}/>
                        <Button variant="primary" type="submit">Comment</Button>
                    </div>
                </Form>
            </div>
         );
    }
}

export default Comment;