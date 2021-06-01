import React, { useState } from 'react';
import './style.css';

export default function SVG(props) {
  let [dim, setDim] = useState([300, 300]);

  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 841.9 595.3" >
      <g fill="#61DAFB">{props.children}</g>
    </svg>
  );
}
//width={dim[0]} height={dim[1]}