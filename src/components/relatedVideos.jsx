import React, { Component } from 'react';
import axios from 'axios';

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

    render(){
        return (<p>hi</p>)
    }
}

export default RelatedVideos
