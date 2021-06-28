import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import CommentForm from './commentForm';

class ReplyModal extends Component{
    constructor(props){
        super(props);
        this.state = {
            show: false
        }
    }

   

    render(){
        return(
            <React.Fragment>
                <Button className='btn btn-primary' onClick={() => {this.setState({show: true})}}>Reply</Button>
                <Modal show={this.state.show} onHide={() => this.setState({show: false})} backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Reply</Modal.Title>
                        </Modal.Header>
                            <Modal.Body>
                                <CommentForm videoId={this.props.videoId} replyId={this.props.replyId}/>
                            </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => this.setState({show: false})}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </React.Fragment>
        )
    }
}

export default ReplyModal