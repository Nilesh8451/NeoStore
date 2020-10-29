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

function ChangePassword({navigation}) {
  const [secureOldPassword, setSecureOldPassword] = useState(true);
  const [securePassword, setSecurePassword] = useState(true);
  const [secureCPassword, setSecureCPassword] = useState(true);
  const [OPEyeStyle, setOPEyeStyle] = useState('eye-slash');
  const [PEyeStyle, setPEyeStyle] = useState('eye-slash');
  const [CPEyeStyle, setCPEyeStyle] = useState('eye-slash');

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

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView>
          <View style={styles.container}>
            <Formik
              initialValues={{
                oldPassword: '',
                password: '',
                confirmPassowrd: '',
              }}
              validationSchema={mySchema}
              onSubmit={(values, action) => {
                console.log(values);
                Toast.show('Your Password Changed Successfully', Toast.LONG);
                navigation.popToTop();
                action.resetForm();
              }}>
              {(formikProps) => (
                <View style={styles.mainDiv}>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View>
                        <FontAwesome5
                          name={'lock'}
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
                          placeholder="Enter OLD Password"
                          secureTextEntry={secureOldPassword}
                          value={formikProps.values.oldPassword}
                          onChangeText={formikProps.handleChange('oldPassword')}
                          onBlur={formikProps.handleBlur('oldPassword')}
                        />
                        <FontAwesome5
                          name={OPEyeStyle}
                          color={'black'}
                          solid
                          size={18}
                          style={{
                            position: 'absolute',
                            right: 13,
                            //   paddingTop: 18,
                            top: 35,
                            opacity: 0.6,
                          }}
                          onPress={() => handleOPasswordEyeClick()}
                        />
                        {formikProps.touched.oldPassword &&
                          formikProps.errors.oldPassword && (
                            <Text style={styles.errorText}>
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
                            placeholder="Enter New Password"
                            secureTextEntry={securePassword}
                            value={formikProps.values.password}
                            onChangeText={formikProps.handleChange('password')}
                            onBlur={formikProps.handleBlur('password')}
                          />
                          <FontAwesome5
                            name={PEyeStyle}
                            color={'black'}
                            solid
                            size={18}
                            style={{
                              position: 'absolute',
                              right: 13,
                              paddingTop: 18,
                              opacity: 0.6,
                            }}
                            onPress={() => handlePasswordEyeClick()}
                          />
                        </View>

                        {formikProps.touched.password &&
                          formikProps.errors.password && (
                            <Text style={styles.errorText}>
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
                              position: 'absolute',
                              right: 13,
                              paddingTop: 18,
                              opacity: 0.6,
                            }}
                            onPress={() => handleCPasswordEyeClick()}
                          />
                        </View>

                        {formikProps.touched.confirmPassowrd &&
                          formikProps.errors.confirmPassowrd && (
                            <Text style={styles.errorText}>
                              {formikProps.touched.confirmPassowrd &&
                                formikProps.errors.confirmPassowrd}
                            </Text>
                          )}
                      </View>

                      <View style={styles.buttonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="Update Password"
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

export default ChangePassword;
