import React from 'react';
import {View, Text, Modal, StyleSheet} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props contains open state to indicate to open and close modal, title is for modal title.
 * @description this contains modal use by application.
 * @returns jsx of modal.
 */

function CustomModal(props) {
  return (
    <Modal transparent={true} visible={props.open} animationType="fade">
      <View style={styles.modalInnerContainer}>
        <View style={styles.modalInnerChildContainer}>
          <View style={styles.modalHeaderContainer}>
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

const styles = StyleSheet.create({
  modalInnerContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalInnerChildContainer: {
    backgroundColor: '#ffffff',
    width: '80%',
    maxWidth: 400,
    padding: 40,
    borderRadius: 10,
  },
  modalHeaderContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
});

export default CustomModal;
