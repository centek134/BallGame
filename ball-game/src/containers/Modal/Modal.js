import React from 'react';
import './Modal.css';
const Modal = (props) => {
    return(
        <div
        className = "Modal"
        style = {{display: props.show? "flex" : "none"}}>
            <div className = "window">
                <header>
                    <h2>Time's out </h2>
                </header>
                <ul>
                    <li>Score: {props.score}</li>
                    <li>Best score: {props.bestScore}</li>
                </ul>
                <button onClick = {props.again}>Try again</button>
            </div>
        </div>
    );
};

export default Modal;