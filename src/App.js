import React from 'react';
import './style.css';
import Line from './line.js';
import Draggable from './draggable.js';
import Dragzone from './dragzone.js';
import SVG from './svgContainer.js';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <Dragzone component={SVG}>
        <Draggable>
          <Line />
        </Draggable>
      </Dragzone>
    </div>
  );
}
