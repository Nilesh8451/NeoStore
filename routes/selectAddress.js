import React, {useState, useEffect} from 'react';
import {View, Text, YellowBox, Image} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import axios from 'axios';
import {baseUrl, updateUserAddress} from '../baseUrl';

function SelectAddress(props) {
  useEffect(() => {
    if (props.userAdd?.length > 0) {
      // console.log(props.userAdd);
      props.userAdd.map((add, ind) => {
        setRadioProps((prevState) => {
          return [...prevState, {label: add.address, value: add.address}];
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
        //  backgroundColor: 'pink'
      }}>
      {radioProps.length == 0 ? (
        <View>
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
      ) : (
        <ScrollView
          contentContainerStyle={{
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '90%',
              marginTop: 30,
              // backgroundColor: 'yellow',
            }}>
            <RadioForm
              style={{}}
              labelStyle={{marginBottom: 25, fontSize: 18}}
              buttonSize={15}
              radio_props={radioProps}
              initial={-1}
              onPress={(value, ind) => {
                // console.log(value, props.userAdd[ind], ind);

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
                    // console.log('Update', res);
                    props.route.params.setSelectedAddress(props.userAdd[ind]);
                    props.navigation.goBack();
                  })
                  .catch((e) => {
                    // console.log('update error', e, e.response);
                  });
              }}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    userAdd: state.userReducer.userAddress,
  };
};

export default connect(mapStateToProps)(SelectAddress);
