import React from 'react';
import './Header.css';

const Header = (props) => {
    return(
        <div className = 'head'>
            <h1>Ball Game</h1>
            <div className = "btns">
                <button onClick = {props.easy}>Easy</button>
                <button onClick = {props.medium}>Medium</button>
                <button onClick = {props.hard}>Hard</button>
            </div>
            <h3>Time: <span>{props.time}s</span></h3>
        </div>
    )
}
export default Header;