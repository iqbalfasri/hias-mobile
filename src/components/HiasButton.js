import React, {useState} from 'react';
import {
  View,
  Text,
  Platform,
  Animated,
  TouchableOpacity,
  TouchableNativeFeedback,
} from 'react-native';
import PropTypes from 'prop-types';

/**
 * Check if platform is android
 */
const isAndroid = Platform.OS === 'android';

/**
 * Button for android
 */
const ButtonAndroid = props => {
  const {type, children} = props;
  return type === 'transparent' ? (
    <TouchableOpacity activeOpacity={0.8} {...props}>{children}</TouchableOpacity>
  ) : (
      <TouchableNativeFeedback
      background={TouchableNativeFeedback.SelectableBackground()}
      {...props}>
      <View {...props}>{props.children}</View>
    </TouchableNativeFeedback>
  );
};
ButtonAndroid.propTypes = {
  type: PropTypes.string,
};
ButtonAndroid.defaultProps = {
  type: 'solid',
};

/**
 * Button for ios
 */
const ButtonIOS = props => (
  <TouchableOpacity activeOpacity={0.8} {...props}>{props.children}</TouchableOpacity>
);

/**
 * TODO: Fix this component ASAP
 * Button with simple animation
 */
export const ButtonImate = () => {
  const INITIAL_ANIMATED_VALUE = new Animated.Value(0);
  const [animatePress, setAnimatePress] = useState(INITIAL_ANIMATED_VALUE);

  // Animation effect
  const animated = () => {
    Animated.timing(animatePress, {
      toValue: 0.8,
      duration: 500,
    }).start();
  };

  // Render button
  return (
    <TouchableOpacity onPressIn={() => animated()}>
      <Animated.View
        style={{
          width: 200,
          height: 120,
          backgroundColor: 'red',
          transform: [{scale: animatePress}],
        }}>
        <Text style={{color: 'red'}}>ANIMATED</Text>
      </Animated.View>
    </TouchableOpacity>
  );
};

/**
 *
 * @param {*} props retrieve all property
 */
const RenderButton = props => {
  return isAndroid ? <ButtonAndroid {...props} /> : <ButtonIOS {...props} />;
};

export default RenderButton;
