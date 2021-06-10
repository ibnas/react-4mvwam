import React, { useState } from 'react';

let Group = function(props) {
  let ch = props.children;
  let [updates, setUpdates] = useState([]);

  let updateChildren = dragState => {
    updates.map(update => {
      update(dragState);
    });
  };

  return React.Children.map(ch, child => {
    child = React.cloneElement(child, { context: props.context });
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
