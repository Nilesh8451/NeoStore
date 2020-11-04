import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function CustomChip(props) {
  return (
    <View
      style={{
        ...styles.chipView,
        borderColor:
          (props.color && props.color != '#FFFFFF' && props.color) || 'blue',
      }}>
      <Text
        style={{
          marginRight: 10,
          marginLeft: 5,
          color:
            (props.color && props.color != '#FFFFFF' && props.color) || 'blue',
        }}>
        {props.text}
      </Text>
      <FontAwesome5
        name={'times'}
        color={
          (props.color && props.color != '#FFFFFF' && props.color) || 'blue'
        }
        solid
        size={20}
        style={{opacity: 0.4}}
        onPress={props.onClick}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  chipView: {
    padding: 7,
    paddingHorizontal: 9,
    borderWidth: 1,
    flexDirection: 'row',
    marginRight: 12,
    marginBottom: 5,
    backgroundColor: 'white',
    borderRadius: 8,
  },
});

export default CustomChip;
