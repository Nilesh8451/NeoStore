import React, {useState, useEffect} from 'react';
import {View, Text, YellowBox, Image, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseUrl, updateUserAddress} from '../baseUrl';
import FlatButton from '../shared/button';

function SelectAddress(props) {
  useEffect(() => {
    if (props.userAdd?.length > 0) {
      props.userAdd.map((add, ind) => {
        let address = `${add.address} ${add.city}, ${
          add.state
        } - ${add.pincode.toString()}, ${add.country}.`;

        setRadioProps((prevState) => {
          return [...prevState, {label: address, value: address}];
        });
      });
    }
  }, [props.userAdd]);

  const [radioProps, setRadioProps] = useState([]);

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      {radioProps.length == 0 ? (
        <View style={styles.noAddressView}>
          <Image
            source={require('../assets/images/emptycart.png')}
            style={{width: 70, height: 70, opacity: 0.7}}
          />
          <Text style={styles.noAddressTextStyle}>
            YOU HAVEN'T ADDED ANY ADDRESS YET
          </Text>

          <FlatButton
            title="Add Address"
            disabled={false}
            paddingVertical={6}
            paddingHorizontal={20}
            fontSize={14}
            color={'#2874F0'}
            onPress={() => {
              props.navigation.navigate('ProfileDrawer');
            }}
          />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              marginTop: 30,
            }}>
            <RadioForm
              style={{}}
              labelStyle={{marginBottom: 25, fontSize: 18}}
              buttonSize={15}
              radio_props={radioProps}
              initial={-1}
              onPress={(value, ind) => {
                axios
                  .put(
                    `${baseUrl}/${updateUserAddress}`,
                    {
                      address_id: props.userAdd[ind].address_id,
                      address: props.userAdd[ind].address,
                      pincode: props.userAdd[ind].pincode,
                      city: props.userAdd[ind].city,
                      state: props.userAdd[ind].state,
                      country: props.userAdd[ind].country,
                      isDeliveryAddress: true,
                    },
                    {
                      headers: {
                        Authorization: `bearer ${props.user?.token}`,
                      },
                    },
                  )
                  .then((res) => {
                    // console.log('Update User Address Response ', res);
                    props.route.params.setSelectedAddress(props.userAdd[ind]);
                    props.navigation.goBack();
                  })
                  .catch((e) => {
                    // console.log('Update User Address Error', e, e.response);
                  });
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  noAddressView: {
    flex: 1,
    marginVertical: 40,
    paddingVertical: 30,
    alignItems: 'center',
  },
  noAddressTextStyle: {
    fontSize: 18,
    marginTop: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    opacity: 0.8,
    marginBottom: 10,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    userAdd: state.userReducer.userAddress,
  };
};

export default connect(mapStateToProps)(SelectAddress);
