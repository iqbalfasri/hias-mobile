import React, {Component} from 'react';
import {context} from './context';

const Context = context;

export default class ContextProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      wishlist: [],
      hotProducts: [],
      bestProducts: [],
      cart: [],
      setWishlist: this.setWishlist,
      setHotProducts: this.setHotProducts,
      setBestProducts: this.setBestProducts,
      setCart: this.setCart,
    };
  }

  setWishlist = value => {
    this.setState({wishlist: value});
  };

  setHotProducts = value => {
    this.setState({hotProducts: value});
  };

  setBestProducts = value => {
    this.setState({bestProducts: value});
  };

  setCart = value => {
    this.setState({cart: value});
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
