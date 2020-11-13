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
import {globalStyles} from '../shared/globalStyle';

const mySchema = yup.object({
  email: yup.string().required().min(4).email(),
});

/**
 * @author Nilesh Ganpat Chavan
 * @param {object} props contains navigation object which is use to navigate between different screens
 * @description forgotPassword screen is used if user of a application forgot his/her password, Using this screen user can enter  registered email so that app can send verification code to change password.
 * @return jsx which is used to get registered email as a input from user.
 */

function ForgotPassword({navigation}) {
  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={globalStyles.authContainer}>
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
                <View style={globalStyles.inputCardMainDiv}>
                  <Text style={{...globalStyles.companyName, marginBottom: 25}}>
                    Neo<Text style={{color: '#2874F0'}}>STORE</Text>
                  </Text>
                  <View style={styles.card}>
                    <View style={globalStyles.cardContent}>
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
                          style={{...globalStyles.leftIconStyle, top: 37}}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={globalStyles.input}
                          placeholder="Enter Email"
                          value={formikProps.values.email}
                          onChangeText={formikProps.handleChange('email')}
                          onBlur={formikProps.handleBlur('email')}
                        />

                        {formikProps.touched.email &&
                          formikProps.errors.email && (
                            <Text style={globalStyles.errorText}>
                              {formikProps.touched.email &&
                                formikProps.errors.email}
                            </Text>
                          )}
                      </View>
                      <View style={globalStyles.authButtonDiv}>
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
  card: {
    marginTop: -10,
  },

  button: {},
  oppositeBut: {},
});

export default ForgotPassword;
