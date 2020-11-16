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
import {baseUrl, recoverPassword} from '../baseUrl';
import {globalStyles} from '../shared/globalStyle';
import LoadingScreen from './loadingScreen';

const mySchema = yup.object({
  optInput: yup
    .string()
    .required()
    .matches(/^\d{4}$/, 'Must contain only 4 digit number'),
  password: yup
    .string()
    .required()
    .min(8)
    .max(12)
    .matches(/^[a-zA-Z0-9_]*$/, 'Must Be Alphanumeric Characters'),
  confirmPassowrd: yup
    .string()
    .required()
    .oneOf([yup.ref('password')], 'Must be same as password'),
});

/**
 * @author Nilesh Ganpat Chavan
 * @param {props}: props is a object which contain token, navigation as a property in it. token is passed from forgot password screen to track session of user who is recovering password. navigation is a object which is use to navigate between different screens
 * @description setPassword screen which contains three input field which is opt that user received on registered email, newPassword and confirm password to set new password.
 * @return jsx which is used to display content to recover user account.
 */

function SetPassword(props) {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureCPassword, setSecureCPassword] = useState(true);
  const [PEyeStyle, setPEyeStyle] = useState('eye-slash');
  const [CPEyeStyle, setCPEyeStyle] = useState('eye-slash');
  const [loading, setLoading] = useState(false);

  const handlePasswordEyeClick = () => {
    setSecurePassword(!securePassword);
    if (PEyeStyle === 'eye-slash') {
      setPEyeStyle('eye');
    } else {
      setPEyeStyle('eye-slash');
    }
  };

  const handleCPasswordEyeClick = () => {
    setSecureCPassword(!secureCPassword);
    if (CPEyeStyle === 'eye-slash') {
      setCPEyeStyle('eye');
    } else {
      setCPEyeStyle('eye-slash');
    }
  };

  const setNewPassword = (values, action) => {
    setLoading(true);
    axios
      .post(
        `${baseUrl}/${recoverPassword}`,
        {
          otpCode: values.optInput,
          newPass: values.password,
          confirmPass: values.confirmPassowrd,
        },
        {
          headers: {
            Authorization: `bearer ${props.route.params.token}`,
          },
        },
      )
      .then((res) => {
        setLoading(false);
        Toast.show(res.data.message, Toast.LONG);
        props.navigation.popToTop();
        action.resetForm();
      })
      .catch((e) => {
        Alert.alert('OPPS!', e.response.data.message);
        setLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LoadingScreen />
        </View>
      ) : (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
          <ScrollView>
            <View style={globalStyles.authContainer}>
              <Formik
                initialValues={{
                  optInput: '',
                  password: '',
                  confirmPassowrd: '',
                }}
                validationSchema={mySchema}
                onSubmit={(values, action) => {
                  setNewPassword(values, action);
                }}>
                {(formikProps) => (
                  <View style={globalStyles.inputCardMainDiv}>
                    <Text style={globalStyles.companyName}>
                      Neo<Text style={{color: '#2874F0'}}>STORE</Text>
                    </Text>
                    <View style={styles.card}>
                      <View style={globalStyles.cardContent}>
                        <View>
                          <FontAwesome5
                            name={'key'}
                            color={'black'}
                            solid
                            size={18}
                            style={globalStyles.leftIconStyle}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={globalStyles.input}
                            keyboardType="number-pad"
                            placeholder="Enter OTP"
                            value={formikProps.values.optInput}
                            onChangeText={formikProps.handleChange('optInput')}
                            onBlur={formikProps.handleBlur('optInput')}
                          />

                          {formikProps.touched.optInput &&
                            formikProps.errors.optInput && (
                              <Text style={globalStyles.errorText}>
                                {formikProps.touched.optInput &&
                                  formikProps.errors.optInput}
                              </Text>
                            )}
                        </View>
                        <View>
                          <View style={{justifyContent: 'center'}}>
                            <FontAwesome5
                              name={'lock'}
                              color={'black'}
                              solid
                              size={18}
                              style={globalStyles.leftIconStyle}
                              onPress={() => handleEyeClick()}
                            />
                            <TextInput
                              style={globalStyles.input}
                              placeholder="Enter New Password"
                              secureTextEntry={securePassword}
                              value={formikProps.values.password}
                              onChangeText={formikProps.handleChange(
                                'password',
                              )}
                              onBlur={formikProps.handleBlur('password')}
                            />
                            <FontAwesome5
                              name={PEyeStyle}
                              color={'black'}
                              solid
                              size={18}
                              style={{
                                ...globalStyles.rightIconStyle,
                                paddingTop: 18,
                              }}
                              onPress={() => handlePasswordEyeClick()}
                            />
                          </View>

                          {formikProps.touched.password &&
                            formikProps.errors.password && (
                              <Text style={globalStyles.errorText}>
                                {formikProps.touched.password &&
                                  formikProps.errors.password}
                              </Text>
                            )}
                        </View>

                        <View>
                          <View style={{justifyContent: 'center'}}>
                            <FontAwesome5
                              name={'lock'}
                              color={'black'}
                              solid
                              size={18}
                              style={globalStyles.leftIconStyle}
                              onPress={() => handleEyeClick()}
                            />
                            <TextInput
                              style={globalStyles.input}
                              placeholder="Enter Password Again"
                              secureTextEntry={secureCPassword}
                              value={formikProps.values.confirmPassowrd}
                              onChangeText={formikProps.handleChange(
                                'confirmPassowrd',
                              )}
                              onBlur={formikProps.handleBlur('confirmPassowrd')}
                            />
                            <FontAwesome5
                              name={CPEyeStyle}
                              color={'black'}
                              solid
                              size={18}
                              style={{
                                ...globalStyles.rightIconStyle,
                                paddingTop: 18,
                              }}
                              onPress={() => handleCPasswordEyeClick()}
                            />
                          </View>

                          {formikProps.touched.confirmPassowrd &&
                            formikProps.errors.confirmPassowrd && (
                              <Text style={globalStyles.errorText}>
                                {formikProps.touched.confirmPassowrd &&
                                  formikProps.errors.confirmPassowrd}
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

export default SetPassword;
