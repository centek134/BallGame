import React from 'react';
import './GameArea.css';

const BallArea = (props) => {
    return(
        <div id = "area" className = "area">
            <div 
            onClick = {props.ballClick}
            id = "ball"
            style = {props.ballStyle}
            className = "ball"></div>
        </div>
    );
};

export default BallArea;
