import React from 'react';
import { useState } from 'react';
import Draggable from './draggable';

let DraggableRect = props => {
  let [coor, setCoord] = props.updateFromUp
    ? [
      props.coord,
      coord => {
        coor = coord;
      }
    ]
    : useState({ x: 100, width: 100, y: 100, height: 200 });

  let fireMyPositionChanged = props.positionChange
    ? props.positionChange
    : () => { };
  let onDrg = dragState => {
    let newCoor = {
      x: coor.x + dragState.dx,
      y: coor.y + dragState.dy,
      width: 100,
      height: 200
    };
    //console.log(newCoor);
    setCoord(newCoor);
    //fireMyPositionChanged(dragState);
  };

  //props.updateState(onDrg,id);

  let strokeWidth = 3;
  return (
    <Draggable
      context={props.context}
      onDrag={onDrg}
      positionChange={fireMyPositionChanged}
      updateState={props.updateState}
      listeners={{
        enter: obj => {
          console.log(obj);
          console.log('  entered');
        }
      }}
    >
      <rect
        {...coor}
        fill={'rgba(255,0,255,1)'}
        style={{
          stroke: 'rgba(0,255,0,0.5)',
          'stroke-width': strokeWidth + 5,
          cursor: 'grab'
        }}
      />
    </Draggable>
  );
};

export default DraggableRect;
