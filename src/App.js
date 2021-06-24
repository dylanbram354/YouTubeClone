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
    this.apiKey = "AIzaSyBzQ39COnqubzZ5K4mbsI1qwIwhmN-0Rf8";
  }

  searchForVideos = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&part=snippet&key=${this.apiKey}`)
    let allVideos = response.data;
    let id = allVideos.items[0].id.videoId;
    let relatedVideos = await this.getRelatedVideos(id);
    this.setState({
      videoId: id,
      videoTitle: allVideos.items[0].snippet.title,
      videoDescription: allVideos.items[0].snippet.description,
      relatedVideos: relatedVideos,
    })
    console.log(this.state.relatedVideos)
  }

  getRelatedVideos = async (id) => {
    let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&type=video&part=snippet&key=${this.apiKey}`)
    let relatedVideosData = response.data.items;
    // console.log(relatedVideosData);
    let relatedVideos = relatedVideosData.map((video) => {
      return ({
        videoId: video.id.videoId,
        videoTitle: video.snippet.title,
        thumbnailUrl: video.snippet.thumbnails.medium.url});
    });
    return relatedVideos
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
              <RelatedVideos relatedVideos={this.state.relatedVideos}/>
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
