import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {addNewAddress, baseUrl} from '../baseUrl';
import LottieView from 'lottie-react-native';
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

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props : object contain token of logged in user and navigation object
 * @description This screen is use to add user new address which will be use for delivery of Products.
 * @returns jsx which contain input fields to enter address details
 */

function AddAddress(props) {
  const token = props.route.params.token;

  const [loading, setLoading] = useState(false);

  const addNewUserAddress = (values, action) => {
    setLoading(true);

    axios
      .post(`${baseUrl}/${addNewAddress}`, values, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('Add New Address Response ', res.data);
        Toast.show(res.data.message, Toast.LONG);
        setLoading(false);
        props.navigation.popToTop();
      })
      .catch((e) => {
        // console.log('Add New Address Error', e, e.response);
        setLoading(false);
        Alert.alert('OOPS!', e.response.data.message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              ...globalStyles.authContainer,
              justifyContent: 'center',
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
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <View style={globalStyles.authContainer}>
              <Formik
                initialValues={{
                  address: '',
                  pincode: '',
                  city: '',
                  state: '',
                  country: '',
                }}
                validationSchema={placeSchema}
                onSubmit={(values, action) => {
                  addNewUserAddress(values, action);
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
                              <Text style={globalStyles.errorText}>
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
                              style={{...globalStyles.leftIconStyle, left: 18}}
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
                              <Text style={globalStyles.errorText}>
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
                              <Text style={globalStyles.errorText}>
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
                              <Text style={globalStyles.errorText}>
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
                              <Text style={globalStyles.errorText}>
                                {formikProps.touched.country &&
                                  formikProps.errors.country}
                              </Text>
                            )}
                        </View>

                        <View style={globalStyles.authButtonDiv}>
                          <View style={styles.button}>
                            <FlatButton
                              title="Submit"
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
      )}
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

export default AddAddress;
