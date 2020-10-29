import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import FlatButton from '../shared/button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

function UpdateAddress() {
  const [userAddress, setUserAddress] = useState([
    {
      address:
        '201/A, sai sheena park, sai baba nagar, navghar road, bhayander East',
      city: 'Mumbai',
      pincode: '401051',
      country: 'India',
    },
    {
      address: '201/A, sai sheena park',
      city: 'Mumbai',
      pincode: '401051',
      country: 'India',
    },
    {
      address: '201/A, sai sheena park, sai baba nagar',
      city: 'Mumbai',
      pincode: '401051',
      country: 'India',
    },
  ]);

  const handleDelete = () => {
    Alert.alert('Warning!', `Are you sure you want to delete this address`, [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          console.log('Deleted');
          Toast.show(`Address Deleted Successfully`, Toast.LONG);
        },
      },
    ]);
  };

  return (
    <View
      style={{
        flex: 1,
        // backgroundColor: 'yellow'
      }}>
      <ScrollView>
        <View style={styles.container}>
          {userAddress.map((add, index) => (
            <View style={styles.addressCard} key={index}>
              <View style={styles.cardContent}>
                <Text style={{width: '70%', fontSize: 17}}>{add.address}</Text>
                <Text style={{fontSize: 16, marginTop: 5}}>
                  {add.city}: {add.pincode}
                </Text>
                <Text style={{fontSize: 16, marginTop: 5}}>{add.country}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: 15}}>
                <FlatButton
                  title="Edit"
                  disabled={false}
                  paddingVertical={7}
                  color={'#2874F0'}
                  onPress={() => {}}
                />
              </View>
              <TouchableWithoutFeedback
                onPress={() => {
                  console.log('clicked');
                  handleDelete();
                }}>
                <View
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 20,
                    padding: 5,
                    backgroundColor: 'red',
                  }}>
                  <FontAwesome5
                    name={'times'}
                    color={'black'}
                    solid
                    size={18}
                    style={{
                      opacity: 0.9,
                      color: 'white',
                    }}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    paddingVertical: 20,
  },
  addressCard: {
    width: '88%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    maxWidth: 500,
    // backgroundColor: 'pink',
    backgroundColor: 'white',
    marginBottom: 20,

    // height: 150,
  },
});

export default UpdateAddress;
