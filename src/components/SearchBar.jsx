import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            searchQuery: ''
         }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.searchForVideos(this.state.searchQuery)
    }

    render() { 
        return ( 
            <div className="d-flex justify-content-center">
                <Form className="w-75 text-center" onSubmit={this.handleSubmit}> 
                    <Form.Group controlId="searchBar" >
                        <Form.Label>Search</Form.Label>
                        <Form.Control type="text" placeholder="Search for videos" name="searchQuery" value={this.state.searchQuery} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant="primary" type="submit">Search</Button>
                </Form>
            </div>
         );
    }
}
 
export default SearchBar;