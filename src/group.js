import React, { useState } from 'react';

let Group = function (props) {
  let ch = props.children;
  // let [dragState, setdragState] = useState([]);
  let [updateKey, setUpdateKey] = useState({});
  // let [key, setKey] = useState([]);

  let updateChildren = (dragState, key) => {
    // setdragState(dragState);
    // setKey(key);
    for (let i in updateKey) {
      if (key === i) continue;
      updateKey[i](dragState);
    }
  };
  let getUpdateStateWithKey = (func, key) => {
    updateKey[key] = func;
    setUpdateKey(updateKey);
  };

  return React.Children.map(ch, child => {
    child = React.cloneElement(child, {
      context: props.context,
      positionChange: updateChildren,
      updateState: getUpdateStateWithKey
    });
    return child;
  });

  // return ch.map(Child => {
  //   let updateState = func => {
  //     updates.push(func);
  //     setUpdates(updates);
  //   };
  //   return (
  //     <Child
  //       context={props.context}
  //       positionChange={updateChildren}
  //       updateState={updateState}
  //     />

  //   );
  // });
};

export default Group;
