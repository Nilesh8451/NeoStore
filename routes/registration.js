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
import RadioForm from 'react-native-simple-radio-button';

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

function Registration({navigation}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [secureCPassword, setSecureCPassword] = useState(true);
  const [PEyeStyle, setPEyeStyle] = useState('eye-slash');
  const [CPEyeStyle, setCPEyeStyle] = useState('eye-slash');

  handlePasswordEyeClick = () => {
    setSecurePassword(!securePassword);
    if (PEyeStyle === 'eye-slash') {
      setPEyeStyle('eye');
    } else {
      setPEyeStyle('eye-slash');
    }
  };

  handleCPasswordEyeClick = () => {
    setSecureCPassword(!secureCPassword);
    if (CPEyeStyle === 'eye-slash') {
      setCPEyeStyle('eye');
    } else {
      setCPEyeStyle('eye-slash');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView
        contentContainerStyle={{
          // paddingVertical: 60,
          backgroundColor: 'white',
        }}>
        <View style={styles.container}>
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
              console.log(values);
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
                      <FontAwesome5
                        name={'user'}
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
                        placeholder="First Name"
                        value={formikProps.values.firstname}
                        onChangeText={formikProps.handleChange('firstname')}
                        onBlur={formikProps.handleBlur('firstname')}
                      />

                      {formikProps.touched.firstname &&
                        formikProps.errors.firstname && (
                          <Text style={styles.errorText}>
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
                        placeholder="Last Name"
                        value={formikProps.values.lastname}
                        onChangeText={formikProps.handleChange('lastname')}
                        onBlur={formikProps.handleBlur('lastname')}
                      />

                      {formikProps.touched.lastname &&
                        formikProps.errors.lastname && (
                          <Text style={styles.errorText}>
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
                        placeholder="Email"
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
                          onPress={() => {}}
                        />
                        <TextInput
                          style={styles.input}
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
                          onPress={() => {}}
                        />
                        <TextInput
                          style={styles.input}
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

                    <View>
                      <FontAwesome5
                        name={'phone-alt'}
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
                        placeholder="Phone Number"
                        value={formikProps.values.phoneno}
                        onChangeText={formikProps.handleChange('phoneno')}
                        onBlur={formikProps.handleBlur('phoneno')}
                      />

                      {formikProps.touched.phoneno &&
                        formikProps.errors.phoneno && (
                          <Text style={styles.errorText}>
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
                          labelStyle={{marginRight: 10}}
                          buttonSize={15}
                          radio_props={radio_props}
                          initial={-1}
                          onPress={(value) => {
                            // console.log(value);
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
                          <Text style={styles.errorText}>
                            {formikProps.touched.gender &&
                              formikProps.errors.gender}
                          </Text>
                        )}
                    </View>

                    <View style={styles.buttonDiv}>
                      <View style={styles.button}>
                        <FlatButton
                          title="Register"
                          // color="#f01d71"
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
                          console.log('Navigation to sign in');
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
            )}
          </Formik>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
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
    maxWidth: 600,
    justifyContent: 'center',
    // alignItems: 'center',
    marginTop: 15,
    marginBottom: 30,
    paddingVertical: 20,
    backgroundColor: 'white',
  },
  companyName: {
    textAlign: 'center',
    fontSize: 35,
    color: 'black',
    // backgroundColor: 'pink',
    fontWeight: 'bold',
    marginTop: 10,
  },

  card: {
    // marginTop: 20,
    marginTop: -10,
    // backgroundColor: 'blue',
    marginHorizontal: 20,
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

export default Registration;
