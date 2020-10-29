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

const mySchema = yup.object({
  email: yup.string().required().min(4).email(),
});

function ForgotPassword({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                email: '',
              }}
              validationSchema={mySchema}
              onSubmit={(values, action) => {
                console.log(values);
                navigation.navigate('SetPassword');
                action.resetForm();
              }}>
              {(formikProps) => (
                <View style={styles.mainDiv}>
                  <Text style={styles.companyName}>
                    Neo<Text style={{color: '#2874F0'}}>STORE</Text>
                  </Text>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View>
                        <Text
                          style={{
                            marginLeft: 7,
                            fontSize: 19,
                            marginBottom: -7,
                          }}>
                          Forgot Password?
                        </Text>
                        <FontAwesome5
                          name={'envelope'}
                          color={'black'}
                          solid
                          size={18}
                          style={{
                            position: 'relative',
                            left: 13,
                            top: 35,
                            opacity: 0.5,
                          }}
                          onPress={() => handleEyeClick()}
                        />
                        <TextInput
                          style={styles.input}
                          placeholder="Enter Email"
                          value={formikProps.values.email}
                          onChangeText={formikProps.handleChange('email')}
                          onBlur={formikProps.handleBlur('email')}
                        />

                        {formikProps.touched.email &&
                          formikProps.errors.email && (
                            <Text style={styles.errorText}>
                              {formikProps.touched.email &&
                                formikProps.errors.email}
                            </Text>
                          )}
                      </View>
                      <View style={styles.buttonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="SUBMIT"
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
    marginTop: 0,
    marginBottom: 25,
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
    paddingLeft: 40,
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

export default ForgotPassword;
