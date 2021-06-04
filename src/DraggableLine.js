import React from 'react';
import Draggable from './draggable';

export let DraggableLine = (props) => {
    // let [coord, setCoord] = useState([0, 0, 100, 100]);
    let style = {
        strokeWidth: 5,
        endCircles: true,
        lineColor: "",
    };

    let coo = [props.x1, props.y1, props.x2, props.y2,];

    let strokeWidth = 1;

    // props.onDrag(
    let onDrg = dragState => {
        coo = [
            coo[0] + dragState.dx,
            coo[1] + dragState.dy,
            coo[2] + dragState.dx,
            coo[3] + dragState.dy
        ];
        props.positionChange(dragState);
    };
    // );
    return (
        <>
            <Draggable context={props.context} onDrag={onDrg}>
                <line
                    x1={coo[0]}
                    y1={coo[1]}
                    x2={coo[2]}
                    y2={coo[3]}
                    style={{ stroke: 'rgba(0,255,0,0.5)', 'stroke-width': strokeWidth + 5, cursor: 'grab' }} />
            </Draggable>
            <line
                //{...props.events} 
                x1={coo[0]}
                y1={coo[1]}
                x2={coo[2]}
                y2={coo[3]}
                style={{ stroke: 'rgb(255,0,0)', 'stroke-width': strokeWidth, cursor: 'grab' }} />


        </>
    );
};
