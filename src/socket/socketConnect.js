import React from 'react';
import ClientContext from './socketContext.js';

const clientConnect = (ChildComponent) => {
  return props => (
    <ClientContext.Consumer>
      { client => {
        return <ChildComponent client={ client } {...props} />
      } }
    </ClientContext.Consumer>
  );
}

export default clientConnect;
