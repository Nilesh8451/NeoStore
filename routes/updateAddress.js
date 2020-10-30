import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,
  Image,
} from 'react-native';
import FlatButton from '../shared/button';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Toast from 'react-native-simple-toast';

function UpdateAddress(props) {
  const [userAddress, setUserAddress] = useState([
    {
      address:
        '201/A, sai sheena park, sai baba nagar, navghar road, bhayander East',
      city: 'Mumbai',
      pincode: '401051',
      state: 'maharashtra',
      country: 'India',
    },
    {
      address: '201/A, sai sheena park',
      city: 'Mumbai',
      pincode: '401051',
      state: 'gujrat',
      country: 'India',
    },
    {
      address: '201/A, sai sheena park, sai baba nagar',
      city: 'Mumbai',
      pincode: '401051',
      state: 'delhi',
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

  return userAddress.length > 0 ? (
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
                  paddingVertical={5}
                  paddingHorizontal={12}
                  color={'#2874F0'}
                  onPress={() => {
                    props.navigation.navigate('EditAddress', {
                      address: add,
                    });
                  }}
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
                    padding: 4,
                    backgroundColor: '#EE5233',
                  }}>
                  <FontAwesome5
                    name={'times'}
                    color={'black'}
                    solid
                    size={16}
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
  ) : (
    <View style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginHorizontal: 10,
          marginVertical: 10,
          paddingVertical: 30,
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/images/emptycart.png')}
          style={{width: 70, height: 70, opacity: 0.9}}
        />
        <Text style={{fontSize: 18, marginTop: 10}}>
          YOU HAVEN'T ADDED ANY ADDRESS YET
        </Text>
      </View>
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
