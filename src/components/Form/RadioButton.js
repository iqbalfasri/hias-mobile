import React, {Component} from 'react';
import {View, Text, TouchableOpacity as Button} from 'react-native';

class MainRadio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      radioSelected: 1,
    };
  }

  radioClick(id) {
    this.setState({
      radioSelected: id,
    });
    alert(this.state.radioSelected);
  }

  render() {
    const products = [
      {
        id: 1,
        data: {
          username: 'halo',
        },
      },
      {
        id: 2,
        data: {
          username: 'halo 2',
        },
      },
      {
        id: 3,
        data: {
          username: 'halo 3',
        },
      },
    ];

    return products.map(val => {
      return (
        <Button key={val.id} onPress={this.radioClick.bind(this, val.id)}>
          <View
            style={{
              height: 24,
              width: 24,
              borderRadius: 12,
              borderWidth: 2,
              borderColor: '#000',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {val.id == this.state.radioSelected ? (
              <View
                style={{
                  height: 12,
                  width: 12,
                  borderRadius: 6,
                  backgroundColor: '#000',
                }}
              />
            ) : null}
          </View>
        </Button>
      );
    });
  }
}

class RadioButton extends Component {
  state = {
    options: ['Buku', 'Laptop', 'Donat'] || this.props.options,
    checked: 0,
  };

  render() {
    return (
      <View style={{flexDirection: 'column'}}>
        {this.state.options.map((option, index) => {
          return (
            <>
              {this.state.checked == index ? (
                <Button style={{backgroundColor: 'red'}}>
                  <Text>Option</Text>
                </Button>
              ) : (
                <Button style={{backgroundColor: 'grey'}}>
                  <Text>Option</Text>
                </Button>
              )}
            </>
          );
        })}
      </View>
    );
  }
}

export default MainRadio;
