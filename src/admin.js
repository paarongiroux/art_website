import React, {useState} from 'react';
import NavBar from './NavBar.js';
import axios from 'axios';
import './App.css';
import userEvent from '@testing-library/user-event';

class Admin extends React.Component{
    constructor(props) {
        super(props);
        this.state = { sketches: [] };
        this.fetchData = this.fetchData.bind(this);
        this.render = this.render.bind(this);
    }

    componentDidMount = async() => {
        await this.fetchData();
        // console.log("componentDidMount", this.state.sketches);
        // this.render();
     }

    fetchData = async() => {
        const apiURL = "https://us-central1-art-portfolio-da3d9.cloudfunctions.net/app/api/sketches";
        const response = await axios.get(apiURL);
        console.log("response received");
        console.log(response.data);

        // console.log(response.data[1]['imgURL']);
        const sketchesData = response.data;
        const sketchesArr = [];

        for (let i = 0; i < sketchesData.length; i++) { 
            const sketch = {
                "pageNo": sketchesData[i]["pageNo"], 
                "imgURL": sketchesData[i]["imgURL"],
                "title": sketchesData[i]["title"],
                "id": sketchesData[i]["id"]
            };
            sketchesArr.push(sketch);
        }
        this.setState({sketches: sketchesArr});
    }

    render() {
        let testOut = "pre-assignment";
        try {
            testOut = this.state.sketches[0]["title"];
        }
        catch(e) {
            testOut = "nothing";
            return (
                <div>
                    < NavBar />
                    <div>Welcome to the Admin page!</div>
                </div>
            )
        }
        return (
            <div>
                < NavBar />
                <table>
                    <tr>
                        <th>PageNo</th>
                        <th>Title</th> 
                        <th>imgURL</th>
                        <th>id</th>
                    </tr>
                    {this.state.sketches.map(function(sketch, index) {
                        return <tr> 
                            <td><button>{sketch["pageNo"]}</button></td>
                            <td>{sketch["title"]}</td>
                            <td><a href={sketch["imgURL"]}>{sketch["imgURL"]}</a></td>
                            <td>{sketch["id"]}</td>
                        </tr>
                    })}
                </table>
                <button>Add new sketch</button>
            </div>
        )};
  }
  
  export default Admin;