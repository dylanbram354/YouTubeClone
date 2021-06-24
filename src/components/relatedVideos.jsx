import React from 'react';
import ListGroup from 'react-bootstrap/ListGroup';

const RelatedVideos = (props) => {

    function createLinks() {

        return props.relatedVideos.map((video) => {
            return (
                <ListGroup.Item key={video.videoId} >
                    <a href={`http://www.youtube.com/watch?v=${video.videoId}`}>{video.videoTitle}</a>
                    <img src={video.thumbnailUrl} alt="video thumbnail"/>
                </ListGroup.Item>
            );
        });
    }
        return (
            <React.Fragment>
                <ListGroup >
                    {createLinks()}
                </ListGroup>
            </React.Fragment>
        );
}
 
export default RelatedVideos;