import React, {Component} from 'react';
import './App.css';
import { Link } from "react-router-dom";
import homebt from './res/home.png';
import penbt from './res/pen.png';
import contactbt from './res/contact.png';
import paintbt from './res/paint.png';

class NavBar extends Component {
    render() {
        return (
            <div className = "padded">
                <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css"></link>
                <ul className = "navul">
                    <li className = "navli"><Link to="/"><img className="navBt" src={homebt}/></Link></li>
                    <li className = "navli"><Link to="/drawings"><img className="navBt" src={penbt}/></Link></li>
                    <li className = "navli"><Link to="/paintings"><img className="navBt" src={paintbt}/></Link></li>
                    {/* <li className = "navli"><Link to="/contact"><img className="navBt" src={contactbt}/></Link></li> */}
                </ul>
            </div>
        );
    }
}

export default NavBar;