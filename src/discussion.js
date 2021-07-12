import React, { Component } from 'react';
import Post from './Post/component/post';
import NavBar from './NavBar.js';
import PostEditor from './PostEditor/components/PostEditor';
import './App.css';
import firebase from 'firebase/app';
import 'firebase/database';

class Discussion extends Component {
  constructor(props) {
    super(props);

    this.addPost = this.addPost.bind(this);
    this.updateLocalState = this.updateLocalState.bind(this);

    this.state = {
      posts: [],
    }
    var firebaseConfig = {
      apiKey: "AIzaSyC68E7MC49Xy2WdCq02Do50HN2RSYIGGG4",
      authDomain: "art-port-forum.firebaseapp.com",
      projectId: "art-port-forum",
      storageBucket: "art-port-forum.appspot.com",
      messagingSenderId: "486094493253",
      appId: "1:486094493253:web:1ecc46724fdc2a24ee752c",
      measurementId: "G-K6002S54Q3"
    };
    // Initialize Firebase
    if (!firebase.apps.length) {
      this.app = firebase.initializeApp(firebaseConfig);
      this.database = firebase.database().ref().child('post');
    }
    else {
        this.app = firebase.app(); // if already initialized, use that one
        this.database = firebase.database().ref().child('post');
    }
    // firebase.analytics();
    const {updateLocalState} = this;
    this.database.on('child_added', snapshot => {
      const response = snapshot.val();
      console.log(response)
      console.log("EEEEEEEEEEEEEEEEE")
      updateLocalState(response);
    });
   
  }

  // componentWillMount() {
  //   const {updateLocalState} = this;
  //   this.database.on('child_added', snapshot => {
  //     const response = snapshot.val();
  //     updateLocalState(response);
  //   });
  // }

  addPost(postBody) {
    const postToSave = {postBody};
    this.database.push().set(postToSave)
  }

  updateLocalState(response) {
    // get current posts in this object's state
    const posts = this.state.posts;
    // read the response 
    const brokenDownPost = response.postBody.split(/[\r\n]/g);
    posts.push(brokenDownPost);
    this.setState({
      posts: posts,
    });
  }

  render() {
    return (
      <div>
        
        < NavBar />
          {
            this.state.posts.map((postBody, idx) =>{
              return (
                <Post key={idx} postBody={postBody}/>
              )}
              )
          };
        < PostEditor addPost={this.addPost}/>
      </div>
    );
  }
}
export default Discussion;