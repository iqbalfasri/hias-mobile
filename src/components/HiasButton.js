import React, {useState, Component} from 'react';
import {
  View,
  Text,
  Platform,
  Animated,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {deviceWidth} from '../lib';

const Button = props => (
  <TouchableOpacity {...props}>{props.children}</TouchableOpacity>
);

export default Button;

export class ButtonAnimated extends Component {
  scaleInAnimated = new Animated.Value(0);
  scaleOutAnimated = new Animated.Value(0);

  getScaleTransformationStyle(
    animated = Animated.Value,
    startSize = 1,
    endSize = 0.99,
  ) {
    const interpolation = animated.interpolate({
      inputRange: [0, 1],
      outputRange: [startSize, endSize],
    });
    return {
      transform: [{scale: interpolation}],
    };
  }

  pressInAnimation(animated = Animated.Value, duration = 150) {
    Animated.timing(animated, {
      toValue: 1,
      duration,
      useNativeDriver: true,
    }).start();
  }

  pressOutAnimation(animated = Animated.Value, duration = 150) {
    Animated.timing(animated, {
      toValue: 0,
      duration,
      useNativeDriver: true,
    }).start();
  }

  render() {
    return (
      <TouchableOpacity
        {...this.props}
        activeOpacity={1}
        style={[
          this.getScaleTransformationStyle(this.scaleInAnimated, 1, 0.95),
          this.props.style,
        ]}
        onPressIn={() => this.pressInAnimation(this.scaleInAnimated, 120)}
        onPressOut={() => this.pressOutAnimation(this.scaleInAnimated, 120)}>
        <Animated.View>{this.props.children}</Animated.View>
      </TouchableOpacity>
    );
  }
}
