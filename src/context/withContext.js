import React from 'react';
import {context} from './context';

const Context = context;

export const withContext = Component => props => {
  return (
    <Context.Consumer>
      {ctx => <Component {...ctx} {...props} />}
    </Context.Consumer>
  );
};
