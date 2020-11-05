import React from 'react';
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
import axios from 'axios';
import {baseUrl, forgotPassword} from '../baseUrl';

const mySchema = yup.object({
  email: yup.string().required().min(4).email(),
});

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation}: navigation is a object which is use to navigate between different screens
 * @description forgotPassword screen is used if user of a application forgot his/her password, Using this screen user can enter  registered email so that app can send verification code to change password.
 * @return jsx which is used to get registered email as a input from user.
 */

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
                axios
                  .post(`${baseUrl}/${forgotPassword}`, values)
                  .then((res) => {
                    Alert.alert('Hooray!', res.data.message);
                    action.resetForm();
                    navigation.navigate('SetPassword', {
                      token: res.data.token,
                    });
                  })
                  .catch((e) => {
                    Alert.alert('OOPS!', e.response.data.message);
                  });
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
    marginTop: 35,
    marginBottom: 50,
  },
  companyName: {
    textAlign: 'center',
    fontSize: 40,
    color: 'black',
    fontWeight: 'bold',
    marginTop: 0,
    marginBottom: 25,
  },

  card: {
    marginTop: -10,
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
  button: {},
  oppositeBut: {},
  errorText: {
    color: 'red',

    marginTop: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
  },

  goToAccountView: {
    width: '100%',
    marginTop: 15,

    flexDirection: 'row',
    justifyContent: 'center',
  },
  goToAccountInnerView: {
    width: '85%',

    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ForgotPassword;
