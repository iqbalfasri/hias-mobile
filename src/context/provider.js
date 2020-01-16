import React, {Component} from 'react';
import {context} from './context';

const Context = context;

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlist: [],
      setWishlist: this.setWishlist,
    };
  }

  setWishlist = value => {
    this.setState({wishlist: value});
  };

  render() {
    return (
      <Context.Provider
        value={{
          store: {
            ...this.state,
          },
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
