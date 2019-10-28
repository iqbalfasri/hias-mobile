import React, {useState, Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class Radio extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex = props.selectedIndex,
      selectedValue = props.radioProps[props.selectedIndex].value
    }
  }

  onSelectRadio(index) {
    this.setState({
      selectedIndex: index,
      selectedValue: this.props.radioProps[index].value
    }, () => {
        this.props.onSelect(this.state.selectedIndex, this.state.selectedValue)
    })
  }

  renderSelectedRadio(index) {
    if (this.state.selectedIndex === index) {
      alert("Radio activated!")
    }
  }

  render() {
    <View>
      {
        this.props.radioProps.map((item, index) => {
          const { label, value } = item;

          return (
            <TouchableOpacity key={index} onPress={() => this.onSelectRadio(index)}>
              <Text>{index}</Text>
            </TouchableOpacity>
          )
        })
      }
    </View>
  }
}

Radio.defaultProps = {
  selectedIndex: -1,
  radioProps: [],
  onSelect: (index, value) => {}
}

export default Radio;
