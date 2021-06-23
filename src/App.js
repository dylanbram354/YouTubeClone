import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';
import RelatedVideos from './components/relatedVideos'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: null,
      videoTitle: null,
      videoDescription: null,
      relatedVideos: []
    }
    this.apiKey = "AIzaSyANHPUkQOFPJK8OHhcOijUniVnUgfSLaUs";
  }

  searchForVideos = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&key=${this.apiKey}`)
    let allVideos = response.data;
    let id = allVideos.items[0].id.videoId;
    let videoData = await this.getVideoData(id);
    let title = (videoData.items[0].snippet.title);
    let description = (videoData.items[0].snippet.description);
    let relatedIds = await this.getRelatedVideos(id);
    this.setState({
      videoId: id,
      videoTitle: title,
      videoDescription: description,
      relatedVideos: relatedIds,
    })
  }

  getVideoData = async (id) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=${this.apiKey}`);
    return(response.data)
  }

  getRelatedVideos = async (id) => {
    let response = await axios.get (`https://www.googleapis.com/youtube/v3/search?relatedToVideoId=${id}&type=video&key=${this.apiKey}`)
    let relatedVideosData = response.data.items;
    let relatedVideoIds = relatedVideosData.map((item) => {
      return (item.id.videoId);
    });
    return relatedVideoIds
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
              <iframe id="ytplayer" type="text/html" width="640" height="360"
                src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
                frameborder="0">
              </iframe>
              <p style={{whiteSpace: 'pre-line'}}>{this.state.videoDescription}</p>
            </div>
            <div className="col-3">
              <RelatedVideos relatedVideos={this.state.relatedVideos} getVideoData={this.getVideoData}/>
            </div>
          </div>
        </div>
        :
        <h1 className="text-center">Do a search!</h1>
        }
      </React.Fragment>
        
    );
  }
}
  

export default App;
