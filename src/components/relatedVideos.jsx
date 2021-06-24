import React, { Component } from 'react';
import axios from 'axios';
import reactDom from 'react-dom';

class RelatedVideos extends Component{
    constructor(props){
        super(props);
        this.state = {
            ids: null,
            titles: null,
            thumbnailUrls: null
        }
    }

    componentDidMount(){
        this.getTitles();
    }

    componentDidUpdate(){
        this.getTitles();
    }

    async getTitles(){
        let titles = [];
        let thumbnailUrls = [];
        for (let i=0; i< this.props.relatedVideos.length; i++){
            let id = this.props.relatedVideos[i];
            let data = await this.props.getVideoData(id);
            titles.push(data.items[0].snippet.title)
            thumbnailUrls.push(data.items[0].snippet.thumbnails.medium.url)
        }
        this.setState({
            ids: this.props.relatedVideos,
            titles: titles,
            thumbnailUrls: thumbnailUrls
        });
        console.log(this.state)
    }

    createLinks() {
        let links = [];
        for (let i = 0 ; i < this.state.ids.length; i++) {
            links.push(<React.Fragment><a href={`http://www.youtube.com/watch?v=${this.state.ids[i]}`} className="list-group-item">{this.state.titles[i]}</a>
             <img src={this.state.thumbnailUrls[i]} /></React.Fragment>)
        }
        return links;
    }

    render(){
        return(
            <React.Fragment>
            {this.state.ids ?
            <div className="list-group">
                {this.createLinks()}
            </div>
            :''}
            </React.Fragment>
        )
    }
}

export default RelatedVideos
