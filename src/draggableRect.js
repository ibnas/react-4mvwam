import React from 'react';
import { useState } from 'react';
import Draggable from './draggable';

// let DraggableRect = props => {
//   // let [coor, setCoord] = props.updateFromUp
//   //   ? [
//   //     props.coord,
//   //     coord => {
//   //       coor = coord;
//   //     }
//   //   ]
//   //   : useState({ x: 100, width: 100, y: 100, height: 200 });

//   let [coor, setCoord] = useState({ x: 100, width: 100, y: 100, height: 200 });

//   let fireMyPositionChanged = props.positionChange
//     ? props.positionChange
//     : () => { };
//   let onDrg = dragState => {
//     let newCoor = {
//       x: coor.x + dragState.dx,
//       y: coor.y + dragState.dy,
//       width: 100,
//       height: 200
//     };

//     setCoord(newCoor);
//     console.log(coor);//fireMyPositionChanged(dragState);
//     console.log(newCoor);
//   };

//   //props.updateState(onDrg,id);

//   let strokeWidth = 3;
//   return (
//     <Draggable
//       context={props.context}
//       onDrag={onDrg}
//       positionChange={fireMyPositionChanged}
//       updateState={props.updateState}
//       listeners={{
//         enter: obj => {
//           // console.log(obj);
//           // console.log('  entered');
//         }
//       }}
//     >
//       <rect
//         {...coor}
//         fill={'rgba(0,125,125,1)'}
//         style={{
//           stroke: 'rgba(0,255,0,0.5)',
//           'stroke-width': strokeWidth + 5,
//           cursor: 'grab'
//         }}
//       />
//     </Draggable>
//   );
// };


class DraggableRect1 extends Draggable {

  constructor(props) {
    super(props);

    this.state = {
      coor: { x: 100, width: 100, y: 100, height: 200 }
    }
  }

  onDrag(dragState) {
    let newCoor = {
      x: coor.x + dragState.dx,
      y: coor.y + dragState.dy,
      width: 100,
      height: 200
    };

    setCoord(newCoor);
    console.log(coor);//fireMyPositionChanged(dragState);
    console.log(newCoor);
  }

  // render() {
  //   let strokeWidth = 3;
  //   let ss = super.render();
  //   return <rect
  //     {...this.state.coor}
  //     fill={'rgba(0,125,125,1)'}
  //     style={{
  //       stroke: 'rgba(0,255,0,0.5)',
  //       'stroke-width': strokeWidth + 5,
  //       cursor: 'grab'
  //     }} />
  // }
}

class DraggableRect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coor: { x: 100, width: 100, y: 100, height: 20 }
    }
  }

  render() {
    let strokeWidth = 3;
    let onDrag = (dragState) => {
      let coor = this.state.coor;
      let newCoor = {
        x: coor.x + dragState.dx,
        y: coor.y + dragState.dy,
        width: 100,
        height: 200
      };

      this.setState({ coor: newCoor });
      console.log(this.state.coor);//fireMyPositionChanged(dragState);
      console.log(newCoor);
    }
    let props = this.props;
    return <Draggable onDrag={onDrag}
      context={props.context}
      positionChange={props.positionChange}
      listeners={props.listeners}
      updateState={props.updateState}>
      <rect
        {...this.state.coor}

        fill={'rgba(0,125,125,1)'}
        style={{
          stroke: 'rgba(0,255,0,0.5)',
          'stroke-width': strokeWidth + 5,
          cursor: 'grab'
        }} />
    </Draggable>
  }
}

export default DraggableRect;
