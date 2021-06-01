import React, { useState } from 'react';
import './style.css';

export default function Line(props) {
  let [coord, setCoord] = useState([0, 0, 100, 100]);

  // props.onDrag = args => {
  //   let co = [
  //     coord[0] + args.dx,
  //     coord[1] + args.dy,
  //     coord[2] + args.dx,
  //     coord[3] + args.dy
  //   ];
  //   this.setCoord(co);
  // };
  let Ln = 'line';
  //setCoord(props.coord ? props.coord : [0, 0, 100, 100]);
  return (
    <line
      {...props.events}
      x1={coord[0]}
      y1={coord[1]}
      x2={coord[2]}
      y2={coord[3]}
      style={{ stroke: 'rgb(255,0,0)', 'stroke-width': '6', cursor: 'grab' }}
    />
  );
}
