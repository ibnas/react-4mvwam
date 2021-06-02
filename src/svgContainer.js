import React, { useState } from 'react';
import './style.css';

export default function SVG(props) {
  let [dim, setDim] = useState([300, 300]);

  return (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" style={{ "background-color": "aliceblue" }} width="500" height="500" >
      <g fill="#61DAFB">{props.children}</g>
    </svg>
  );
}
//width={dim[0]} height={dim[1]}viewBox="0 0 841.9 595.3"