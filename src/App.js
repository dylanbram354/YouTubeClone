import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RelatedVideos from './components/relatedVideos';
import Comments from './components/comments';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: null,
      videoTitle: null,
      videoDescription: null,
      relatedVideos: []
    }
    this.apiKey = "AIzaSyAuX4xfHIXMvvgYVOm4BDv6O8RXiP_R5Cg";
  }

  setVideoDataById = async (id) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&part=snippet&key=${this.apiKey}`);
    let title = response.data.items[0].snippet.title;
    let description = response.data.items[0].snippet.description;
    let relatedVideosArray = await this.getRelatedVideos(id)
    let newState = {
      videoId: id,
      videoTitle: title,
      videoDescription: description,
      relatedVideos: relatedVideosArray
    }
    this.setState(newState);
  }

  searchForVideos = async (searchQuery) => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=${this.apiKey}`);
      let allVideos = response.data;
      let relatedVideosArray = await this.getRelatedVideos(allVideos.items[0].id.videoId)
      this.setState({
        videoId: allVideos.items[0].id.videoId,
        videoTitle: allVideos.items[0].snippet.title,
        videoDescription: allVideos.items[0].snippet.description,
        relatedVideos: relatedVideosArray
    })
  }

  getRelatedVideos = async (videoId) => { 
      let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoId}&type=video&part=snippet&key=${this.apiKey}`);
      let relatedVideosWithSnippet = response.data.items.filter(video => video.snippet);
      let relatedVideosArray = relatedVideosWithSnippet.map((video) => {
        return ({
            videoId: video.id.videoId,
            videoTitle: video.snippet.title, //not all videos are coming back with snippets?
            thumbnailUrl: video.snippet.thumbnails.medium.url});
        });
      return relatedVideosArray
  }

  render(){
    return (
      <div >
        <SearchBar searchForVideos={this.searchForVideos}/>
        {this.state.videoId ? 
        <div className="container">
          <div className="row">
            <div className="text-center col-9">
              <h1>{this.state.videoTitle}</h1>
              <iframe title="title" id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                frameBorder="0">
              </iframe>
              <p style={{whiteSpace: 'pre-line'}}>{this.state.videoDescription}</p>
              <Comments videoId={this.state.videoId} replyId={null}/>
            </div>
            <div className="col-3">
              <RelatedVideos relatedVideos={this.state.relatedVideos} apiKey={this.apiKey} displayNewVideo={this.setVideoDataById}/>
            </div>
          </div>
        </div>
        :
        <h1 className="text-center">Do a search!</h1>
        }
      </div>
        
    );
  }
}
  

export default App;
