import React, {useState} from 'react';
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
  //   console.log(props.route.params.address);
  const addressObj = props.route.params.address;
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                address: addressObj.address,
                pincode: addressObj.pincode,
                city: addressObj.city,
                state: addressObj.state,
                country: addressObj.country,
              }}
              validationSchema={placeSchema}
              onSubmit={(values, action) => {
                console.log(values);
                Toast.show('Address Updated Successfully', Toast.LONG);
                props.navigation.popToTop();
                action.resetForm();
              }}>
              {(formikProps) => (
                <View style={styles.mainDiv}>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View style={{justifyContent: 'center'}}>
                        <FontAwesome5
                          name={'address-card'}
                          color={'black'}
                          solid
                          size={18}
                          style={{
                            position: 'relative',
                            left: 13,
                            top: 35,
                            opacity: 0.5,
                          }}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Your Address"
                          multiline
                          value={formikProps.values.address}
                          onChangeText={formikProps.handleChange('address')}
                          onBlur={formikProps.handleBlur('address')}
                        />

                        {formikProps.touched.address &&
                          formikProps.errors.address && (
                            <Text style={styles.errorText}>
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
                              position: 'relative',
                              left: 13,
                              top: 35,
                              opacity: 0.5,
                            }}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={styles.input}
                            keyboardType="number-pad"
                            placeholder="Enter Your Pin Code"
                            value={formikProps.values.pincode}
                            onChangeText={formikProps.handleChange('pincode')}
                            onBlur={formikProps.handleBlur('pincode')}
                          />
                        </View>

                        {formikProps.touched.pincode &&
                          formikProps.errors.pincode && (
                            <Text style={styles.errorText}>
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
                            style={{
                              position: 'relative',
                              left: 13,
                              top: 35,
                              opacity: 0.5,
                            }}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Enter Your City Name"
                            value={formikProps.values.city}
                            onChangeText={formikProps.handleChange('city')}
                            onBlur={formikProps.handleBlur('city')}
                          />
                        </View>

                        {formikProps.touched.city &&
                          formikProps.errors.city && (
                            <Text style={styles.errorText}>
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
                            style={{
                              position: 'relative',
                              left: 13,
                              top: 35,
                              opacity: 0.5,
                            }}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Enter Your State Name"
                            value={formikProps.values.state}
                            onChangeText={formikProps.handleChange('state')}
                            onBlur={formikProps.handleBlur('state')}
                          />
                        </View>

                        {formikProps.touched.state &&
                          formikProps.errors.state && (
                            <Text style={styles.errorText}>
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
                            style={{
                              position: 'relative',
                              left: 13,
                              top: 35,
                              opacity: 0.5,
                            }}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={styles.input}
                            placeholder="Enter Your Country Name"
                            value={formikProps.values.country}
                            onChangeText={formikProps.handleChange('country')}
                            onBlur={formikProps.handleBlur('country')}
                          />
                        </View>

                        {formikProps.touched.country &&
                          formikProps.errors.country && (
                            <Text style={styles.errorText}>
                              {formikProps.touched.country &&
                                formikProps.errors.country}
                            </Text>
                          )}
                      </View>

                      <View style={styles.buttonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="Save Changes"
                            // color="#f01d71"
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
  container: {
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainDiv: {
    flex: 1,
    height: '100%',
    width: '90%',
    maxWidth: 600,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 35,
    marginBottom: 50,
    // backgroundColor: 'red',
  },
  companyName: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    // backgroundColor: 'pink',
    fontWeight: 'bold',
    marginTop: 10,
  },

  card: {
    // marginTop: 20,
    marginTop: -10,
    // backgroundColor: 'blue',
    // marginHorizontal: 20,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 20,
  },
  cardHeading: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    // marginTop: 10,
    borderColor: 'gray',
    padding: 12,
    fontSize: 16,
    paddingLeft: 45,
    paddingRight: 40,
    borderRadius: 2,
  },
  inputImage: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    marginTop: 10,
  },
  inputImageBox: {
    backgroundColor: 'gray',
    padding: 7,
    marginRight: 10,
  },
  inputHeading: {
    marginTop: 10,
    fontSize: 17,
  },
  buttonDiv: {
    flexDirection: 'column',
    marginTop: 25,
  },
  button: {
    // marginRight: 20,
  },
  oppositeBut: {},
  errorText: {
    color: 'red',
    // marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
  },

  goToAccountView: {
    width: '100%',
    marginTop: 15,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  goToAccountInnerView: {
    width: '85%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditAddress;
