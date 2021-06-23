import React, { Component } from 'react';
import axios from 'axios';
import SearchBar from './components/SearchBar';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: null,
      videoTitle: null,
      videoDescription: null,
      relatedVideos: []
    }
  }

  searchForVideos = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&type=video&key=AIzaSyBzQ39COnqubzZ5K4mbsI1qwIwhmN-0Rf8`)
    let allVideos = response.data;
    let id = allVideos.items[0].id.videoId;
    let videoData = await this.getVideoData(id);
    let title = (videoData.items[0].snippet.title);
    let description = (videoData.items[0].snippet.description);
    this.setState({
      videoId: id,
      videoTitle: title,
      videoDescription: description
    })
  }

  getVideoData = async (id) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=id%2C+snippet&id=${id}&key=AIzaSyBzQ39COnqubzZ5K4mbsI1qwIwhmN-0Rf8`);
    return(response.data)
  }

  render(){
    return (
      <React.Fragment>
        {this.state.videoId ? 
        <div className="text-center">
          <h1>{this.state.videoTitle}</h1>
          <iframe id="ytplayer" type="text/html" width="640" height="360"
            src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
            frameborder="0">
          </iframe>
        </div>
        :
        <h1 className="text-center">Do a search!</h1>
        }
        <SearchBar searchForVideos={this.searchForVideos}/>
      </React.Fragment>
        
    );
  }
}
  

export default App;
