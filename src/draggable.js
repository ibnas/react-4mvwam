import React, { useState } from 'react';
import { unstable_renderSubtreeIntoContainer } from 'react-dom';
import './style.css';

export default function Draggable(props) {
  let children = props.children;


  return (
    <>
      {React.Children.map(children, child => {
        return (
          <DraggableChild
            context={props.context}
            onDrag={props.onDrag}
            child={child}
            positionChange={props.positionChange}
            listeners={props.listeners}
            updateState={props.updateState}
          />
        ); //;
      })}
    </>
  );
}



class DraggableChild extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mousedown: false,
      dragging: false,
      dragState: {},
      subscrib: [],
      id: '#' + Math.round(Math.random() * 10000)
    };

    let onDrag = props.onDrag ? props.onDrag : () => { };
    this.onDrag = onDrag;

    let update = dragstate => {
      onDrag(dragstate);
    };

    let r = props.updateState ? props.updateState(update, this.state.id) : false;
    if (!r)
      while (r === -1) {
        this.setState({ id: '#' + Math.round(Math.random() * 10000) });
        props.updateState(update, this.state.id);
      }


    let list = {};

    if (props.listeners) {
      list = props.listeners;
    }

    let events = {
      onMouseEnter: () => {
        if (list.enter) {
          if (this.state.dragging) list.enter(this.state.dragState);
          else list.enter(props.context.getDragState());
        }
      },
      onMouseLeave: evt => {
        if (list.leave) {
          if (this.state.dragging) list.leave(this.state.dragState);
          else list.enter(props.context.getDragState());
        }
        if (this.state.dragging) {
          if (props.context.subscribe) {
            let subscribe = props.context.subscribe;
            let unSubscribe = props.context.unSubscribe;
            let moveId = this.state.subscrib[0]
              ? this.state.subscrib[0]
              : subscribe('onMouseMove', this.move, this.state.id);
            let leaveId = this.state.subscrib[1]
              ? this.state.subscrib[1]
              : subscribe('onMouseLeave', () => {
                this.setState({ mousedown: false });
                stopDrag();
              }, this.state.id);
            let upId = this.state.subscrib[2]
              ? this.state.subscrib[2]
              : subscribe('onMouseUp', () => {
                this.setState({ mousedown: false });
                stopDrag();
              }, this.state.id);

            let stopDrag = () => {
              this.setState({ dragging: false });
              props.context.setDragState(null);
              id = false;
              unSubscribe('onMouseMove', moveId, id);
              unSubscribe('onMouseLeave', leaveId, id);
              unSubscribe('onMouseUp', upId, id);
              this.setState({ subscrib: [] });
            };
            this.setState({ subscrib: [moveId, leaveId, upId] });

          }
        }
      },
      onMouseMove: evt => {
        if (list.move) {
          if (this.state.dragging) list.move(this.state.dragState);
          else list.enter(props.context.getDragState());
        }
        if (this.state.dragging) {
          this.move(evt);
        } else if (this.state.mousedown) {
          this.setState({ dragging: true });
          let id = props.context.setDragState({ ds: this.state.dragState });
          this.move(evt);
        }

      },
      onMouseUp: () => {
        if (list.up) {
          if (this.state.dragging) list.up(this.state.dragState);
          else list.enter(props.context.getDragState());
        }
        this.setState({ mousedown: [] });
        this.setState({ dragging: [] });
        props.context.setDragState(null);

      },
      onMouseDown: evt => {
        if (list.down) {
          if (this.state.dragging) list.down(this.state.dragState);
          else list.enter(props.context.getDragState());
        }
        this.setState({ mousedown: [] });
        let dragState = this.state.dragState;
        dragState.x = evt.pageX;
        dragState.y = evt.pageY;
        this.setState({ dragState: dragState });

      }
    };

    this.events = events;

  }

  move = evt => {
    if (this.state.dragging) {
      let ds = { ...this.state.dragState };
      ds.dx = evt.pageX - this.state.dragState.x;
      ds.dy = evt.pageY - this.state.dragState.y;
      ds.x = evt.pageX;
      ds.y = evt.pageY;
      ds.dragObject = this.state.id;

      this.onDrag(ds);
      this.setState({ dragState: ds });
    }
  };

  onDrag() {

  }

  render() {
    let c = React.cloneElement(this.props.child, {
      ...this.events,
      // positionChange: positionCh,
      setOnDrag: cb => (onDrag = cb)
    });
    return c;
  }

}




// let DraggableChild = props => {
//   let [mousedown, setMousedown] = useState(false);
//   let [dragging, setDragging] = useState(false);
//   let [dragState, setDragstate] = useState({});
//   let [subscrib, setSubscribe] = useState([]);
//   let [id, setID] = useState('#' + Math.round(Math.random() * 10000));

//   let move = evt => {
//     if (dragging) {
//       let ds = { ...dragState };
//       ds.dx = evt.pageX - dragState.x;
//       ds.dy = evt.pageY - dragState.y;
//       ds.x = evt.pageX;
//       ds.y = evt.pageY;
//       dragState.dragObject = id;

//       onDrag(ds);
//       setDragstate(ds);
//       // console.log(ds);
//     }
//   };
//   let events = {
//     onMouseEnter: () => {
//       if (list.enter) {
//         if (dragging) list.enter(dragState);
//         else list.enter(props.context.getDragState());
//         //console.log(props.context.getDragState());
//       }
//     }, //gggrgrgrgr
//     onMouseLeave: evt => {
//       if (list.leave) {
//         if (dragging) list.leave(dragState);
//         else list.enter(props.context.getDragState());
//       }
//       if (dragging) {
//         if (props.context.subscribe) {
//           let subscribe = props.context.subscribe;
//           let unSubscribe = props.context.unSubscribe;
//           let moveId = subscrib[0]
//             ? subscrib[0]
//             : subscribe('onMouseMove', move, id);
//           let leaveId = subscrib[1]
//             ? subscrib[1]
//             : subscribe('onMouseLeave', () => {
//               setMousedown(false);
//               stopDrag();
//             }, id);
//           let upId = subscrib[2]
//             ? subscrib[2]
//             : subscribe('onMouseUp', () => {
//               setMousedown(false);
//               stopDrag();
//             }, id);

//           let stopDrag = () => {
//             setDragging(false);
//             props.context.setDragState(null);
//             id = false;
//             unSubscribe('onMouseMove', moveId, id);
//             unSubscribe('onMouseLeave', leaveId, id);
//             unSubscribe('onMouseUp', upId, id);
//             setSubscribe([]);
//           };
//           setSubscribe([moveId, leaveId, upId]);
//         }
//       }
//       // console.log('mouse leave');
//       // console.log(evt);
//       // console.log(dragState);
//     },
//     onMouseMove: evt => {
//       if (list.move) {
//         if (dragging) list.move(dragState);
//         else list.enter(props.context.getDragState());
//       }
//       if (dragging) {
//         move(evt);
//       } else if (mousedown) {
//         setDragging(true);
//         id = props.context.setDragState({ ds: dragState });
//         move(evt);
//       }
//       // console.log(evt);
//       // console.log(dragState);
//       // console.log('mouse move');
//     },
//     onMouseUp: () => {
//       if (list.up) {
//         if (dragging) list.up(dragState);
//         else list.enter(props.context.getDragState());
//       }
//       setMousedown(false);
//       setDragging(false);
//       props.context.setDragState(null);
//       // console.log('mouse released');
//       // console.log(dragState);
//     },
//     onMouseDown: evt => {
//       if (list.down) {
//         if (dragging) list.down(dragState);
//         else list.enter(props.context.getDragState());
//       }
//       setMousedown(true);
//       dragState.x = evt.pageX;
//       dragState.y = evt.pageY;
//       // console.log('mouse pressed');
//       // console.log(dragState);
//     }
//   };
//   let onDrag = props.onDrag ? props.onDrag : () => { };

//   let update = dragstate => {
//     onDrag(dragstate);
//   };
//   let r = props.updateState ? props.updateState(update, id) : false;
//   while (r === -1) {
//     setID('#' + Math.round(Math.random() * 10000));
//     props.updateState(update, id);
//   }

//   let list = {};
//   if (props.listeners) {
//     list = props.listeners;
//   }

//   let positionCh = (dragState) => {
//     props.positionChange(dragState, id)
//   }

//   let c = React.cloneElement(props.child, {
//     ...events,
//     positionChange: positionCh,
//     setOnDrag: cb => (onDrag = cb)
//   });
//   return c;
// };