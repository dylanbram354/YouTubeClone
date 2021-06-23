import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      videoId: 'hyXCWYqpId4'
    }
  }

  searchForVideos = async (searchQuery) => {
    let response = await axios.get(`https://www.googleapis.com/youtube/v3/search?q=${searchQuery}&key=AIzaSyBzQ39COnqubzZ5K4mbsI1qwIwhmN-0Rf8`)
    let allVideos = response.data;
    this.setState({
      videoId: allVideos.items[0].id.videoId
    })
  }

  componentDidMount(){
    this.searchForVideos('macOS big sur')
  }

  render(){
    return (
      <div>
        <iframe id="ytplayer" type="text/html" width="640" height="360"
          src={`https://www.youtube.com/embed/${this.state.videoId}?autoplay=1&origin=http://example.com`}
          frameborder="0"></iframe>
      </div>
    );
  }
}
  

export default App;
