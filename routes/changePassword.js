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
import {baseUrl, changePassword} from '../baseUrl';
import LottieView from 'lottie-react-native';
import {globalStyles} from '../shared/globalStyle';

const mySchema = yup.object({
  oldPassword: yup
    .string()
    .required()
    .min(8)
    .max(12)
    .matches(/^[a-zA-Z0-9_]*$/, 'Must Be Alphanumeric Characters'),
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
 * @param {object} props which contain token of logged in user and navigation object.
 * @description This screen is used by user to change his/her password from my account screen.
 * @returns jsx which contains input field to get details from user to change password.
 */

function ChangePassword(props) {
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureCPassword, setSecureCPassword] = useState(true);
  const [OPEyeStyle, setOPEyeStyle] = useState('eye-slash');
  const [PEyeStyle, setPEyeStyle] = useState('eye-slash');
  const [CPEyeStyle, setCPEyeStyle] = useState('eye-slash');
  const [loadingAPI, setLoadingAPI] = useState(false);

  const handleOPasswordEyeClick = () => {
    setSecureOldPassword(!secureOldPassword);
    if (OPEyeStyle === 'eye-slash') {
      setOPEyeStyle('eye');
    } else {
      setOPEyeStyle('eye-slash');
    }
  };

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

  const changeUserPassword = (values, action) => {
    setLoadingAPI(true);

    axios
      .post(
        `${baseUrl}/${changePassword}`,
        {
          oldPass: values.oldPassword,
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
        Toast.show('Your Password Changed Successfully', Toast.LONG);
        setLoadingAPI(false);
        props.navigation.popToTop();
      })
      .catch((e) => {
        setLoadingAPI(false);
        Alert.alert('OOPS!', e.response.data.message);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {loadingAPI ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              ...globalStyles.authContainer,
              justifyContent: 'center',
              alignItems: 'center',
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
                  oldPassword: '',
                  password: '',
                  confirmPassowrd: '',
                }}
                validationSchema={mySchema}
                onSubmit={(values, action) => {
                  changeUserPassword(values, action);
                }}>
                {(formikProps) => (
                  <View style={globalStyles.inputCardMainDiv}>
                    <View style={styles.card}>
                      <View style={globalStyles.cardContent}>
                        <View>
                          <FontAwesome5
                            name={'lock'}
                            color={'black'}
                            solid
                            size={18}
                            style={globalStyles.leftIconStyle}
                            onPress={() => {}}
                          />
                          <TextInput
                            style={globalStyles.input}
                            placeholder="Enter OLD Password"
                            secureTextEntry={secureOldPassword}
                            value={formikProps.values.oldPassword}
                            onChangeText={formikProps.handleChange(
                              'oldPassword',
                            )}
                            onBlur={formikProps.handleBlur('oldPassword')}
                          />
                          <FontAwesome5
                            name={OPEyeStyle}
                            color={'black'}
                            solid
                            size={18}
                            style={{...globalStyles.rightIconStyle, top: 35}}
                            onPress={() => handleOPasswordEyeClick()}
                          />
                          {formikProps.touched.oldPassword &&
                            formikProps.errors.oldPassword && (
                              <Text style={globalStyles.errorText}>
                                {formikProps.touched.oldPassword &&
                                  formikProps.errors.oldPassword}
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
                              title="Update Password"
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

export default ChangePassword;
