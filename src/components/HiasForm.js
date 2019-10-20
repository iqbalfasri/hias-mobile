import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {View, TextInput, StyleSheet, Text, ScrollView} from 'react-native';
import {Container} from './HiasLayout';
import {deviceWidth} from '../lib';

/**
 *
 * @param {*} props receive object
 */
export const SearchBar = props => {
  return (
    <View style={styles.searchBar}>
      <View style={styles.searchIcon}>
        <Icon color="#9F9F9F" size={16} name="search" type="font-awesome" />
      </View>
      <TextInput {...props} />
    </View>
  );
};
SearchBar.propTypes = {
  props: PropTypes.object,
};

export const FormWithLabel = props => {
  const {placeholder, label, isPassword, type} = props;
  return (
    <ScrollView>
      <Container>
        <View style={[props.style, styles.formGroup]} {...props}>
          <Text style={styles.formGroupLabel}>{label}</Text>
          <TextInput
            keyboardType={type}
            autoCapitalize={'none'}
            autoCompleteType={'off'}
            autoCorrect={false}
            secureTextEntry={isPassword}
            style={styles.formGroupInput}
            placeholder={placeholder}
            {...props}
          />
        </View>
      </Container>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  formGroup: {
    // Width 100% device
    marginBottom: 8,
  },
  formGroupLabel: {
    textAlign: 'left',
    paddingVertical: 13,
  },
  formGroupInput: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderWidth: 0.5,
    borderColor: '#4E4E4E',
    borderRadius: 5,
  },
});

FormWithLabel.defaultProps = {
  placeholder: 'example text',
  isPassword: false,
};
