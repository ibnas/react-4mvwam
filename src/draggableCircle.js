import React from 'react';
import { useState } from "react";
import Draggable from "./draggable";

let DraggableCircle = (props) => {

    // if (props.updateFromUp) {
    //     let coor = [props.x, props.y, props.r];
    //     let setCoord = (coord) => {
    //         coor = coord;
    //     }
    // } else {
    //     let [coor, setCoord] = useState([props.x, props.y, props.r]);
    // }
    let [coor, setCoord] = (props.updateFromUp) ? [[props.x, props.y, props.r], (coord) => { coor = coord }] : useState([props.x, props.y, props.r]);
    // if (props.x != coor[0] || props.y != coor[1] || props.r != coor[2])
    //     setCoord([props.x, props.y, props.r]);

    let positionChange = (props.positionChange) ? props.positionChange : () => { };
    // props.onDrag(
    let onDrg = dragState => {
        setCoord([
            coor[0] + dragState.dx,
            coor[1] + dragState.dy,
            coor[2]
        ]);
        positionChange(dragState);
    }
    // );



    return (
        <Draggable context={props.context} onDrag={onDrg} >
            <circle r={coor[2]} fill={'rgba(255,0,255,1)'} cx={coor[0]}
                cy={coor[1]}></circle>
        </Draggable>
    );

}


export default DraggableCircle;