import React, {useState, useEffect} from 'react';
import {View, Text, YellowBox} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import RadioForm from 'react-native-simple-radio-button';

function SelectAddress(props) {
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

  const [radioProps, setRadioProps] = useState([]);

  YellowBox.ignoreWarnings([
    'Non-serializable values were found in the navigation state',
  ]);

  useEffect(() => {
    userAddress.map((add, ind) => {
      setRadioProps((prevState) => {
        return [...prevState, {label: add.address, value: add.address}];
      });
    });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        //  backgroundColor: 'pink'
      }}>
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
            initial={0}
            onPress={(value) => {
              console.log(value);
              props.route.params.setSelectedAddress(value);
              props.navigation.goBack();
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}

export default SelectAddress;
