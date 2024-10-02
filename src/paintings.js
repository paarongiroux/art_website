import React from 'react';
import NavBar from './NavBar.js';
import './App.css';
import paint1 from './res/painting.png';
import paint2 from './res/painting2.png';
import paint3 from './res/painting3.png';
import paint4 from './res/painting4.png';
import paint5 from './res/painting5.png';
import paint6 from './res/painting6.png';
import paint7 from './res/painting7.png';
import name from './res/Name.png';

// var paintlist = [
//     paint1,
//     paint2,
//     paint3,
//     paint4
// ];


function Paintings() {
  return (
    <div>
      < NavBar />
      
      <div className="imgContainer">
        <div className="scrolling-wrapper">
            <img className="painting" src={paint1} alt="painting" />
            <img className="painting" src={paint2} alt="painting" />
            <img className="painting" src={paint3} alt="painting" />
            <img className="painting" src={paint4} alt="painting" />
            <img className="painting" src={paint5} alt="painting" />
            <img className="painting" src={paint6} alt="painting" />
            <img className="painting" src={paint7} alt="painting" />
        </div>
        
        <img className="nameImg" src={name} alt="Aaron Giroux" />
      </div>
      
    </div>
  );
}

export default Paintings;
