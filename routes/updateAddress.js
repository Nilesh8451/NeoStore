import React, {useEffect, useState} from 'react';
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
import axios from 'axios';
import {baseUrl, deleteUserAddress, getUserAddress} from '../baseUrl';
import LottieView from 'lottie-react-native';
import {getCustomerAddress} from '../redux/user/userAction';
import {connect} from 'react-redux';

function UpdateAddress(props) {
  const [custAdd, setCustAdd] = useState([]);
  const handleDelete = (id) => {
    Alert.alert('Warning!', `Are you sure you want to delete this address`, [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => {
          // console.log('Deleted');
          axios
            .delete(`${baseUrl}/${deleteUserAddress}/${id}`, {
              headers: {
                Authorization: `bearer ${props.route.params.token}`,
              },
            })
            .then((res) => {
              // console.log('Success', res.data);
              Toast.show(`Address Deleted Successfully`, Toast.LONG);
              const userAdd = custAdd.filter((add) => add.address_id != id);
              setCustAdd(userAdd);
            })
            .catch((e) => {
              // console.log('error', e, e.response);
            });
        },
      },
    ]);
  };

  useEffect(() => {
    props.getCustAdd(props.route.params.token);
  }, []);

  useEffect(() => {
    if (props.isLoading === false) setCustAdd(props.userAdd);
  }, [props.isLoading]);

  if (props.isLoading) {
    return (
      <View
        style={{
          ...styles.container,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <LottieView
          source={require('../assets/json/loader2.json')}
          autoPlay
          style={{
            width: 200,
            height: 200,
          }}
          loop
        />
      </View>
    );
  } else {
    return custAdd.length > 0 ? (
      <View
        style={{
          flex: 1,
          // backgroundColor: 'yellow'
        }}>
        <ScrollView>
          <View style={styles.container}>
            {custAdd.map((add, index) => (
              <View style={styles.addressCard} key={index}>
                <View style={styles.cardContent}>
                  <Text style={{width: '70%', fontSize: 17}}>
                    {add.address}
                  </Text>
                  <Text style={{fontSize: 16, marginTop: 5}}>
                    {add.city}: {add.pincode}
                  </Text>
                  <Text style={{fontSize: 16, marginTop: 5}}>
                    {add.country}
                  </Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 15}}>
                  <FlatButton
                    title="Edit"
                    disabled={false}
                    paddingVertical={4}
                    paddingHorizontal={14}
                    fontSize={14}
                    color={'#2874F0'}
                    onPress={() => {
                      props.navigation.navigate('EditAddress', {
                        address: add,
                        token: props.route.params.token,
                      });
                    }}
                  />
                </View>
                <TouchableWithoutFeedback
                  onPress={() => {
                    // console.log('clicked');
                    handleDelete(add.address_id);
                  }}>
                  <View
                    style={{
                      position: 'absolute',
                      right: 20,
                      top: 20,
                      padding: 4,
                      // backgroundColor: '#EE5233',
                    }}>
                    <FontAwesome5
                      name={'trash-alt'}
                      color={'black'}
                      solid
                      size={18}
                      style={{
                        opacity: 0.9,
                        color: 'black',
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
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flex: 1,
            marginVertical: 40,
            paddingVertical: 30,
            alignItems: 'center',
          }}>
          <Image
            source={require('../assets/images/emptycart.png')}
            style={{width: 70, height: 70, opacity: 0.7}}
          />
          <Text
            style={{
              fontSize: 18,
              marginTop: 16,
              fontWeight: 'bold',
              textTransform: 'capitalize',
              opacity: 0.8,
            }}>
            YOU HAVEN'T ADDED ANY ADDRESS YET
          </Text>
        </View>
      </View>
    );
  }
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

const mapStateToProps = (state) => {
  return {
    userAdd: state.userReducer.userAddress,
    isLoading: state.userReducer.addressLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCustAdd: (token) => dispatch(getCustomerAddress(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateAddress);
