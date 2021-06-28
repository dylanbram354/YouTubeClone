import React from 'react';
import CommentForm from './commentForm';
import Comments from './comments';

const CommentSection = (props) => {
    return(
        <React.Fragment>
            <CommentForm videoId={props.videoId}/>
            <Comments videoId={props.videoId} replyId={null}/>
        </React.Fragment>
    )
}

export default CommentSection