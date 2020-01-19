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
      hotProductsHome: [],
      bestProductsHome: [],
      productDetail: null,
    };

    this.actions = {
      setWishlist: this.setWishlist,
      setHotProducts: this.setHotProducts,
      setBestProducts: this.setBestProducts,
      setCart: this.setCart,
      setHotProductsHome: this.setHotProductsHome,
      setBestProductsHome: this.setBestProductsHome,
      setProductDetail: this.setProductDetail,
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

  setHotProductsHome = value => {
    this.setState({hotProductsHome: value});
  };

  setBestProductsHome = value => {
    this.setState({bestProductsHome: value});
  };

  setCart = value => {
    this.setState({cart: value});
  };

  setProductDetail = value => {
    this.setState({productDetail: value});
  };

  render() {
    return (
      <Context.Provider
        value={{
          store: {
            ...this.state,
          },
          actions: {
            ...this.actions,
          },
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
