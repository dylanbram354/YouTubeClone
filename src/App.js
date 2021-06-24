import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RelatedVideos from './components/relatedVideos';
import Comment from './components/comment';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: null,
      videoTitle: null,
      videoDescription: null,
      relatedVideos: []
    }
    this.apiKey = "AIzaSyBPTMnB_5DlD7dDkRcalos8LUNKYK6gR9k";
  }

  searchForVideos = async (searchQuery) => {
      let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=${this.apiKey}`);
      let allVideos = response.data;
      this.getRelatedVideos({
        videoId: allVideos.items[0].id.videoId,
        videoTitle: allVideos.items[0].snippet.title,
        videoDescription: allVideos.items[0].snippet.description,
    })
  }

  getRelatedVideos = async (videoData) => { 
      let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${videoData.videoId}&type=video&part=snippet&key=${this.apiKey}`);
      let relatedVideosWithSnippet = response.data.items.filter(video => video.snippet);
      let relatedVideosArray = relatedVideosWithSnippet.map((video) => {
        return ({
            videoId: video.id.videoId,
            videoTitle: video.snippet.title, //not all videos are coming back with snippets?
            thumbnailUrl: video.snippet.thumbnails.medium.url});
        });
        this.setState({
          videoId: videoData.videoId,
          videoTitle: videoData.videoTitle,
          videoDescription: videoData.videoDescription,
          relatedVideos: relatedVideosArray
      })
      console.log(this.state.relatedVideos)
  }

  render(){
    return (
      <React.Fragment>
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
            </div>
            <div className="col-3">
              <RelatedVideos relatedVideos={this.state.relatedVideos} apiKey={this.apiKey}/>
            </div>
          </div>
          <Comment />
        </div>
        :
        <h1 className="text-center">Do a search!</h1>
        }
      </React.Fragment>
        
    );
  }
}
  

export default App;
