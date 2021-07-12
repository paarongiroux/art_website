import React, {useState} from 'react';
import NavBar from './NavBar.js';
import axios from 'axios';
import './App.css';

class Admin extends React.Component{
    // const sketches = [];

    // const apiURL = "https://us-central1-art-portfolio-da3d9.cloudfunctions.net/app/api/sketches";

    // const fetchData = async() => {
    //     const response = await axios.get(apiURL);
    //     console.log("response received");

    //     // console.log(response.data[1]['imgURL']);
    //     const sketchesData = response.data;

    //     for (let i = 0; i < sketchesData.length; i++) { 
    //         const sketch = {
    //             "pageNo": sketchesData[i]["pageNo"], 
    //             "imgURL": sketchesData[i]["imgURL"],
    //             "title": sketchesData[i]["title"]
    //         };
    //         sketches.push(sketch);
    //     }

    //     // console.log(sketches);

    // }

    render() {
        return (
            <div>
                < NavBar />
                <div>Welcome to the Admin page!</div>
            </div>
        )};
  }
  
  export default Admin;