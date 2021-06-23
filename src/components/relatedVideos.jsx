import React, { Component } from 'react';

class RelatedVideos extends Component{
    constructor(props){
        super(props);
        this.state = {
            titles: null
        }
    }

    componentDidMount(){
        this.getTitles();
    }

    getTitles(){
        let videoTitles = this.props.relatedVideos.map(async (id) => {
            let videoData = await this.props.getVideoData(id);
            let title = videoData.items[0].snippet.title;
            return title
        })
        let titles = [];
        Promise.all(videoTitles).then((values)=>{console.log(values)}); //how get calues outside of console.log???

    }

    render(){
        return (<p>hi</p>)
    }
}

export default RelatedVideos
