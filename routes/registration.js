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
import RadioForm from 'react-native-simple-radio-button';
import Toast from 'react-native-simple-toast';
import axios from 'axios';
import {baseUrl, register} from '../baseUrl';
import LottieView from 'lottie-react-native';
import {globalStyles} from '../shared/globalStyle';

const loginSchema = yup.object({
  firstname: yup
    .string()
    .required()
    .min(2)
    .matches(/^[a-zA-Z]+$/, 'Must contain only alphabets'),
  lastname: yup
    .string()
    .required()
    .min(2)
    .matches(/^[a-zA-Z]+$/, 'Must contain only alphabets'),
  email: yup.string().required().min(4).email(),
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
  phoneno: yup
    .string()
    .required()
    .matches(/^\d{10}$/, 'Must contain only 10 digit number')
    .test('firstLetter', 'First letter should be greater than 6', function (
      val,
    ) {
      if (val) {
        return val[0] > 6;
      }
    }),

  gender: yup.string().required(),
});

var radio_props = [
  {label: 'Male', value: 0},
  {label: 'Female', value: 1},
];

/**
 * @author Nilesh Ganpat Chavan
 * @param {navigation}:navigation is a object which is use to navigate between different screens.
 * @description registration screen is use to take input from user to make him/her a new user of application.
 * @return jsx which is used to display content which helps to register as a user of application.
 */

function Registration({navigation}) {
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

  const registerUser = (values, action) => {
    setLoading(true);
    axios
      .post(`${baseUrl}/${register}`, {
        first_name: values.firstname,
        last_name: values.lastname,
        email: values.email,
        pass: values.password,
        confirmPass: values.confirmPassowrd,
        phone_no: values.phoneno,
        gender: values.gender,
      })
      .then((res) => {
        Toast.show(res.data.message, Toast.LONG);
        action.resetForm();
        navigation.navigate('LoginDrawer');
        setLoading(false);
      })
      .catch((e) => {
        // console.log('Register User Error ', e, e.response);
        if (e.response?.data?.message == undefined) {
          setLoading(false);
          Alert.alert('OPPS!', 'Something went wrong, Please try again later!');
        } else {
          setLoading(false);
          Alert.alert('OOPS!', e.response.data.message);
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{
          backgroundColor: loading ? 'transparent' : 'white',
        }}>
        <View style={globalStyles.authContainer}>
          <Formik
            initialValues={{
              firstname: '',
              lastname: '',
              email: '',
              password: '',
              confirmPassowrd: '',
              phoneno: '',
              gender: '',
            }}
            validationSchema={loginSchema}
            onSubmit={(values, action) => {
              registerUser(values, action);
            }}>
            {(formikProps) =>
              loading === false ? (
                <View
                  style={{
                    ...styles.mainDiv,
                    backgroundColor: loading ? '' : 'white',
                  }}>
                  <Text style={globalStyles.companyName}>
                    Neo<Text style={{color: '#2874F0'}}>STORE</Text>
                  </Text>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View>
                        <FontAwesome5
                          name={'user'}
                          color={'black'}
                          solid
                          size={18}
                          style={globalStyles.leftIconStyle}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={globalStyles.input}
                          placeholder="First Name"
                          value={formikProps.values.firstname}
                          onChangeText={formikProps.handleChange('firstname')}
                          onBlur={formikProps.handleBlur('firstname')}
                        />

                        {formikProps.touched.firstname &&
                          formikProps.errors.firstname && (
                            <Text style={globalStyles.errorText}>
                              {formikProps.touched.firstname &&
                                formikProps.errors.firstname}
                            </Text>
                          )}
                      </View>

                      <View>
                        <FontAwesome5
                          name={'user'}
                          color={'black'}
                          solid
                          size={18}
                          style={globalStyles.leftIconStyle}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={globalStyles.input}
                          placeholder="Last Name"
                          value={formikProps.values.lastname}
                          onChangeText={formikProps.handleChange('lastname')}
                          onBlur={formikProps.handleBlur('lastname')}
                        />

                        {formikProps.touched.lastname &&
                          formikProps.errors.lastname && (
                            <Text style={globalStyles.errorText}>
                              {formikProps.touched.lastname &&
                                formikProps.errors.lastname}
                            </Text>
                          )}
                      </View>

                      <View>
                        <FontAwesome5
                          name={'envelope'}
                          color={'black'}
                          solid
                          size={18}
                          style={globalStyles.leftIconStyle}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={globalStyles.input}
                          placeholder="Email"
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

                      <View>
                        <View style={{justifyContent: 'center'}}>
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
                            placeholder="Password"
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
                            onPress={() => {}}
                          />
                          <TextInput
                            style={globalStyles.input}
                            placeholder="Confirm Password"
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

                      <View>
                        <FontAwesome5
                          name={'phone-alt'}
                          color={'black'}
                          solid
                          size={18}
                          style={globalStyles.leftIconStyle}
                          onPress={() => {}}
                        />
                        <TextInput
                          style={globalStyles.input}
                          keyboardType="number-pad"
                          placeholder="Phone Number"
                          value={formikProps.values.phoneno}
                          onChangeText={formikProps.handleChange('phoneno')}
                          onBlur={formikProps.handleBlur('phoneno')}
                        />

                        {formikProps.touched.phoneno &&
                          formikProps.errors.phoneno && (
                            <Text style={globalStyles.errorText}>
                              {formikProps.touched.phoneno &&
                                formikProps.errors.phoneno}
                            </Text>
                          )}
                      </View>

                      <View style={{alignItems: 'center'}}>
                        <View
                          style={{
                            flexDirection: 'row',
                            marginTop: 20,
                            justifyContent: 'center',
                          }}>
                          <Text style={{marginRight: 20, fontSize: 17}}>
                            Gender:
                          </Text>
                          <RadioForm
                            style={{
                              flexDirection: 'row',
                            }}
                            animation={false}
                            labelStyle={{marginRight: 10}}
                            buttonSize={15}
                            radio_props={radio_props}
                            initial={
                              formikProps.values.gender == 'Male'
                                ? 0
                                : formikProps.values.gender == 'Female'
                                ? 1
                                : -1
                            }
                            onPress={(value) => {
                              if (value === 0) {
                                formikProps.setFieldValue('gender', 'Male');
                              } else {
                                formikProps.setFieldValue('gender', 'Female');
                              }
                            }}
                          />
                        </View>
                        {formikProps.touched.gender &&
                          formikProps.errors.gender && (
                            <Text style={globalStyles.errorText}>
                              {formikProps.touched.gender &&
                                formikProps.errors.gender}
                            </Text>
                          )}
                      </View>

                      <View style={globalStyles.authButtonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="Register"
                            disabled={!formikProps.isValid}
                            color={!formikProps.isValid ? 'gray' : '#2874F0'}
                            onPress={formikProps.handleSubmit}
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                  <View style={styles.goToAccountView}>
                    <View style={styles.goToAccountInnerView}>
                      <Text style={{fontSize: 18, marginRight: 15}}>
                        Have An Account?
                        <TouchableWithoutFeedback
                          onPress={() => {
                            navigation.navigate('LoginDrawer');
                          }}>
                          <Text
                            style={{
                              textDecorationLine: 'underline',
                              color: 'blue',
                            }}>
                            {' '}
                            Sign In
                          </Text>
                        </TouchableWithoutFeedback>
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={{
                    ...globalStyles.authContainer,
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: 100,
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
              )
            }
          </Formik>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    height: '100%',
    width: '90%',
    maxWidth: 600,
    justifyContent: 'center',
    marginTop: 15,
    marginBottom: 30,
    paddingVertical: 20,
  },

  card: {
    marginTop: -10,
    marginHorizontal: 20,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 20,
  },

  button: {},
  oppositeBut: {},

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

export default Registration;
