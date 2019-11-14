import React, {Component, Fragment} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';

import {ButtonAnimated} from '../HiasButton';

import {getDeviceHeight} from '../../lib/utils';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: props.data,
    };
  }

  render() {
    return (
      <Fragment>
        {this.state.data.map(data => {
          return (
            <ButtonAnimated key={data.id}>
              <View style={styles.cardWrapper}>
                <Image />
              </View>
            </ButtonAnimated>
          );
        })}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: getDeviceHeight / 3,
    marginRight: 20,
  },
});

export default Card;
