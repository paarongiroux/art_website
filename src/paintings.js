import React from 'react';
import NavBar from './NavBar.js';
import './App.css';
import cover from './res/pencover.png';
import paint1 from './res/painting.png';
import paint2 from './res/painting2.png';
import paint3 from './res/painting3.png';
import name from './res/Name.png';

var paintlist = [
    paint1,
    paint2,
    paint3
];


function Paintings() {
  return (
    <div>
      < NavBar />
      
      <div className="imgContainer">
        <div class="scrolling-wrapper">
            <img class="painting" src={paint1} alt="painting" />
            <img class="painting" src={paint2} alt="painting" />
            <img class="painting" src={paint3} alt="painting" />
        </div>
        
        <img className="nameImg" src={name} alt="Aaron Giroux" />
      </div>
      
    </div>
  );
}

export default Paintings;
