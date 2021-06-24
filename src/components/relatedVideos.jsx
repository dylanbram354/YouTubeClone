import React, { Component } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

class RelatedVideos extends Component{
    constructor(props){
        super(props);
        this.state = {
            videos: props.relatedVideos //array of video objects with id, title, thumbnail URL
        }
    }

    // componentDidMount(){
    //     this.setState({
    //         videos: this.props.relatedVideos
    //     })
    // }

    componentDidUpdate(){
        if (this.state.videos !== this.props.relatedVideos)
        this.setState({
            videos: this.props.relatedVideos
        })
    }

    createLinks() {
        let links = [];
        for (let i = 0 ; i < this.state.videos.length; i++) {
            links.push(
                <ListGroup.Item key={`${this.state.videos[i].videoId}`} >
                    <a href={`http://www.youtube.com/watch?v=${this.state.videos[i].videoId}`}>{this.state.videos[i].videoTitle}</a>
                    <img src={this.state.videos[i].thumbnailUrl} />
                </ListGroup.Item>)
        }
        return links;
    }

    render(){
        return(
            <React.Fragment>
            <ListGroup >
                {this.createLinks()}
            </ListGroup>
            </React.Fragment>
        )
    }
}

export default RelatedVideos
