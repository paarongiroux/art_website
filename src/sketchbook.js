import React from 'react';
import NavBar from './NavBar.js';
import './App.css';

import cover from './res/pencover.png'
import name from './res/Name.png';
import end from './res/end.png';

var page = 0;
// var pagesdict = [
//   cover,
//   end
// ];

function preparePages(r) {
  let images = {};
  r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  console.log(images);
  return images;
}

const pagesdict = preparePages(require.context('./res/sketches', false, /\.png$/));



function prevPage() {
  if (page > 0) {
    page --;
  }
  if (page==0) {
    return document.getElementById('drawing').src=cover;
  }
  return document.getElementById('drawing').src=pagesdict['sketch' + page + '.png'];
}

function nextPage() {
  var numSketches = Object.keys(pagesdict).length
  if (page <= numSketches) {
    page ++;
  }
  if (page > numSketches) {
    return document.getElementById('drawing').src=end;
  }
  console.log('sketch' + page + '.png')
  return document.getElementById('drawing').src=pagesdict['sketch' + page + '.png'];
}

function Sketchbook() {
  return (
    <div>
      < NavBar />
      
      <div className="imgContainer">
        <img id="drawing" src={cover} alt="book cover" />
        <div>
          <button id="prevbtn"onClick={prevPage}/>
          <button id="nextbtn" onClick={nextPage}/>
        </div>
        <img className="nameImg" src={name} alt="Aaron Giroux" />
      </div>
      
    </div>
  );
}

export default Sketchbook;
