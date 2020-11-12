import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {baseUrl, updateUserAddress} from '../baseUrl';
import {getCustomerAddress} from '../redux/user/userAction';
import {connect} from 'react-redux';
import {globalStyles} from '../shared/globalStyle';

const placeSchema = yup.object({
  address: yup.string().required(),
  pincode: yup
    .string()
    .required()
    .min(6)
    .max(6)
    .matches(/^[0-9]+$/, 'Must contain only digit'),
  city: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Must contain only alphabets'),
  state: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Must contain only alphabets'),
  country: yup
    .string()
    .required()
    .matches(/^[a-zA-Z]+$/, 'Must contain only alphabets'),
});

function EditAddress(props) {
  const addressObj = props.route.params.address;

  const editUserAddress = (values) => {
    axios
      .put(
        `${baseUrl}/${updateUserAddress}`,
        {
          address_id: addressObj.address_id,
          address: values.address,
          pincode: values.pincode,
          city: values.city,
          state: values.state,
          country: values.country,
        },
        {
          headers: {
            Authorization: `bearer ${props.route.params.token}`,
          },
        },
      )
      .then((res) => {
        props.getCustAdd(props.route.params.token);
        Toast.show('Address Updated Successfully', Toast.LONG);
        props.navigation.goBack();
      })
      .catch((e) => {
        // console.log('Edit Address Error', e, e.response);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={globalStyles.authContainer}>
            <Formik
              initialValues={{
                address: addressObj.address,
                pincode: addressObj.pincode.toString(),
                city: addressObj.city,
                state: addressObj.state,
                country: addressObj.country,
              }}
              validationSchema={placeSchema}
              onSubmit={(values, action) => {
                editUserAddress(values);
              }}>
              {(formikProps) => (
                <View style={globalStyles.inputCardMainDiv}>
                  <View style={styles.card}>
                    <View style={globalStyles.cardContent}>
                      <View style={{justifyContent: 'center'}}>
                        <FontAwesome5
                          name={'address-card'}
                          color={'black'}
                          solid
                          size={18}
                          style={globalStyles.leftIconStyle}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={{...globalStyles.input, paddingLeft: 45}}
                          placeholder="Enter Your Address"
                          multiline
                          value={formikProps.values.address}
                          onChangeText={formikProps.handleChange('address')}
                          onBlur={formikProps.handleBlur('address')}
                        />

                        {formikProps.touched.address &&
                          formikProps.errors.address && (
                            <Text style={globalStyles.authContainer}>
                              {formikProps.touched.address &&
                                formikProps.errors.address}
                            </Text>
                          )}
                      </View>
                      <View>
                        <View style={{justifyContent: 'center'}}>
                          <FontAwesome5
                            name={'map-pin'}
                            color={'black'}
                            solid
                            size={18}
                            style={{
                              ...globalStyles.leftIconStyle,
                              left: 18,
                              top: 37,
                            }}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={{...globalStyles.input, paddingLeft: 45}}
                            keyboardType="number-pad"
                            placeholder="Enter Your Pin Code"
                            value={formikProps.values.pincode}
                            onChangeText={formikProps.handleChange('pincode')}
                            onBlur={formikProps.handleBlur('pincode')}
                          />
                        </View>

                        {formikProps.touched.pincode &&
                          formikProps.errors.pincode && (
                            <Text style={globalStyles.authContainer}>
                              {formikProps.touched.pincode &&
                                formikProps.errors.pincode}
                            </Text>
                          )}
                      </View>

                      <View>
                        <View style={{justifyContent: 'center'}}>
                          <FontAwesome5
                            name={'city'}
                            color={'black'}
                            solid
                            size={18}
                            style={globalStyles.leftIconStyle}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={{...globalStyles.input, paddingLeft: 45}}
                            placeholder="Enter Your City Name"
                            value={formikProps.values.city}
                            onChangeText={formikProps.handleChange('city')}
                            onBlur={formikProps.handleBlur('city')}
                          />
                        </View>

                        {formikProps.touched.city &&
                          formikProps.errors.city && (
                            <Text style={globalStyles.authContainer}>
                              {formikProps.touched.city &&
                                formikProps.errors.city}
                            </Text>
                          )}
                      </View>

                      <View>
                        <View style={{justifyContent: 'center'}}>
                          <FontAwesome5
                            name={'playstation'}
                            color={'black'}
                            solid
                            size={18}
                            style={globalStyles.leftIconStyle}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={{...globalStyles.input, paddingLeft: 45}}
                            placeholder="Enter Your State Name"
                            value={formikProps.values.state}
                            onChangeText={formikProps.handleChange('state')}
                            onBlur={formikProps.handleBlur('state')}
                          />
                        </View>

                        {formikProps.touched.state &&
                          formikProps.errors.state && (
                            <Text style={globalStyles.authContainer}>
                              {formikProps.touched.state &&
                                formikProps.errors.state}
                            </Text>
                          )}
                      </View>

                      <View>
                        <View style={{justifyContent: 'center'}}>
                          <FontAwesome5
                            name={'flag'}
                            color={'black'}
                            solid
                            size={18}
                            style={globalStyles.leftIconStyle}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={{...globalStyles.input, paddingLeft: 45}}
                            placeholder="Enter Your Country Name"
                            value={formikProps.values.country}
                            onChangeText={formikProps.handleChange('country')}
                            onBlur={formikProps.handleBlur('country')}
                          />
                        </View>

                        {formikProps.touched.country &&
                          formikProps.errors.country && (
                            <Text style={globalStyles.authContainer}>
                              {formikProps.touched.country &&
                                formikProps.errors.country}
                            </Text>
                          )}
                      </View>

                      <View style={globalStyles.authButtonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="Save Changes"
                            disabled={!formikProps.isValid}
                            color={!formikProps.isValid ? 'gray' : '#2874F0'}
                            onPress={formikProps.handleSubmit}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: -10,
  },
  button: {},
  oppositeBut: {},
});

const mapDispatchToProps = (dispatch) => {
  return {
    getCustAdd: (token) => dispatch(getCustomerAddress(token)),
  };
};

export default connect('', mapDispatchToProps)(EditAddress);
