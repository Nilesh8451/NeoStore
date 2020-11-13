import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props contains title which use to for button title, onPress is a function that called if click on button, color is to give color to button, disabled is boolean value to disabled button, paddingHorizontal,paddingVertical,fontSize, textTransform are optional parameter.
 * @description this is custom button use by application.
 * @returns jsx of button.
 */

export default function FlatButton({
  title,
  onPress,
  color,
  disabled,
  paddingHorizontal = 10,
  paddingVertical = 11,
  fontSize = 16,
  textTransform = 'uppercase',
}) {
  return (
    <TouchableOpacity onPress={onPress} disabled={disabled}>
      <View
        style={{
          ...styles.button,
          backgroundColor: color,
          paddingHorizontal: paddingHorizontal,
          paddingVertical: paddingVertical,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            fontSize: fontSize,
            textTransform: textTransform,
          }}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginVertical: 2,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',

    textAlign: 'center',
  },
});
