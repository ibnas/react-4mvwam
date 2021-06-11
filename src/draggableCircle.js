import React from 'react';
import { useState } from "react";
import Draggable from "./draggable";

let DraggableCircle = (props) => {


    // let [coor, setCoord] = (props.updateFromUp) ? [[props.x, props.y, props.r], (coord) => { coor = coord }] : useState([props.x, props.y, props.r]);
    let [coor, setCoord] = useState([props.x, props.y, props.r]);



    let positionChange = (props.positionChange) ? props.positionChange : () => { };
    // props.onDrag(
    let newCoor = [...coor];

    function onDrg(dragState) {
        // let newCoor = [...coor];
        newCoor = [
            newCoor[0] + dragState.dx,
            newCoor[1] + dragState.dy,
            newCoor[2]
            // newCoor[0] + 10,
            // newCoor[1] + 10,
            // newCoor[2]
        ];
        setCoord([newCoor[0], newCoor[1], newCoor[2]]);
        positionChange(dragState);
    }
    // );



    return (
        <Draggable context={props.context} onDrag={onDrg} >
            <circle r={coor[2]} fill={'rgba(255,0,255,1)'} cx={coor[0]}
                cy={coor[1]} onClick={false}></circle>
        </Draggable>
    );

}


export default DraggableCircle;