import React, { Component } from 'react';

class PostEditor extends Component {
    constructor (props) {
        super(props);

        this.state = {
            postBody: '',
        };

        this.handlePostInputChange = this.handlePostInputChange.bind(this);
        this.createPost = this.createPost.bind(this);
    }
    

    handlePostInputChange(ev) {
        this.setState({
          postBody: ev.target.value
        })
    }

    createPost() {
        this.props.addPost(this.state.postBody)
        this.setState({
            postBody: '',
          })
    }

    render () {
        return (
            <div>
                <div className="post-input"><textarea onChange={this.handlePostInputChange}/></div>
                <div className="post-input" onClick={this.createPost}><button> post</button></div>
            </div>
        );
    }
}

export default PostEditor;