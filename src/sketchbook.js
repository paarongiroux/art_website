import React, { Component } from 'react';
import NavBar from './NavBar.js';
import './App.css';
import cover from './res/pencover.png';
import sketch1 from './res/sketch1.png';
import sketch2 from './res/sketch2.png';
import sketch3 from './res/sketch3.png';
import sketch4 from './res/sketch4.png';
import sketch5 from './res/sketch5.png';
import sketch6 from './res/sketch6.png';
import sketch7 from './res/sketch7.png';
import sketch8 from './res/sketch8.png';
import sketch9 from './res/sketch9.png';
import sketch10 from './res/sketch10.png';
import sketch11 from './res/sketch11.png';
import sketch12 from './res/sketch12.png';
import sketch13 from './res/sketch13.png';
import sketch14 from './res/sketch14.png';
import sketch15 from './res/sketch15.png';
import sketch16 from './res/sketch16.png';
import sketch17 from './res/sketch17.png';
import sketch18 from './res/sketch18.png';
import sketch19 from './res/sketch19.png';
import sketch20 from './res/sketch20.png';
import sketch21 from './res/sketch21.png';
import sketch22 from './res/sketch22.png';
import sketch23 from './res/sketch23.png';
import sketch24 from './res/sketch24.png';
import sketch25 from './res/sketch25.png';
import sketch26 from './res/sketch26.png';
import sketch27 from './res/sketch27.png';
import sketch28 from './res/sketch28.png';
import sketch29 from './res/sketch29.png';
import sketch30 from './res/sketch30.png';
import name from './res/Name.png';
import end from './res/end.png';

var pagesdict = [
  cover,
  sketch1,
  sketch2,
  sketch3,
  sketch4,
  sketch5,
  sketch6,
  sketch7,
  sketch8,
  sketch9,
  sketch10,
  sketch11,
  sketch12,
  sketch13,
  sketch14,
  sketch15,
  sketch16,
  sketch17,
  sketch18,
  sketch19,
  sketch20,
  sketch21,
  sketch22,
  sketch23,
  sketch24,
  sketch25,
  sketch26,
  sketch27,
  sketch28,
  sketch29,
  sketch30,
  end
];

class Sketchbook extends Component {
  
  constructor(props) {
    super(props);
    this.state = { page: 0 };
    this.prevPage=this.prevPage.bind(this);
    this.nextPage=this.nextPage.bind(this);
  }

  prevPage() {
    if (this.state.page > 0) {
      this.setState({page: this.state.page - 1})
    }
    return document.getElementById('drawing').src=pagesdict[this.state.page];
  }
  nextPage() {
    var numSketches = pagesdict.length - 1
    if (this.state.page < numSketches) {
      this.setState({page: this.state.page + 1})
    }
    console.log(pagesdict[3])
    return document.getElementById('drawing').src=pagesdict[this.state.page];
  }
  render() {
    return (
      <div>
        < NavBar />
        
        <div className="imgContainer">
          <img id="drawing" src={cover} alt="book cover" />
          <div>
            <button id="prevbtn"onClick={this.prevPage}/>
            <button id="nextbtn" onClick={this.nextPage}/>
          </div>
          <img className="nameImg" src={name} alt="Aaron Giroux" />
        </div>
        
      </div>
    );
  }
}

export default Sketchbook;
