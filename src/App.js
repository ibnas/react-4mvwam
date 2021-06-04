import React from 'react';
import './style.css';
import Line from './line.js';
import Draggable from './draggable.js';
import Dragzone from './dragzone.js';
import SVG from './svgContainer.js';
import DraggableCircle from './draggableCircle';
import DraggableRect from './draggableRect';

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <Dragzone component={SVG}>
        <Line x1={0} y1={0} x2={300} y2={300} />
        <Line x1={300} y1={0} x2={0} y2={300} />
        <DraggableCircle x={100} y={200} r={30} />
        <DraggableRect coord={{ x: 100, width: 100, y: 100, height: 200 }} />
      </Dragzone>
    </div>
  );
}
