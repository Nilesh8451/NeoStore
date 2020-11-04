import React, {useState} from 'react';
import {View, Text, Modal, ScrollView} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function CustomModal(props) {
  return (
    <Modal transparent={true} visible={props.open} animationType="fade">
      <View
        style={{
          backgroundColor: '#000000aa',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: '80%',
            maxWidth: 400,
            padding: 40,
            borderRadius: 10,
            // flex: 1,
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingBottom: 25,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
            }}>
            <Text style={{fontSize: 23}}>{props.title}</Text>
            <FontAwesome5
              name={'times'}
              color={'black'}
              solid
              size={25}
              style={{}}
              onPress={() => {
                props.setClickedVal('');
                props.setOpen(false);
              }}
            />
          </View>
          <View
            style={{
              marginTop: 20,
              // backgroundColor: 'yellow'
            }}>
            <Text style={{fontSize: 17, marginLeft: 10}}>
              Please {props.title}
            </Text>

            {props.children}
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default CustomModal;
