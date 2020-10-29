import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function FlatButton({
  title,
  onPress,
  color,
  disabled,
  paddingHorizontal = 10,
  paddingVertical = 11,
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
        <Text style={styles.buttonText}>{title}</Text>
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
    textTransform: 'uppercase',
    fontSize: 16,
    textAlign: 'center',
  },
});
