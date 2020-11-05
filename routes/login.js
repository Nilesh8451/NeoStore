import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {Formik} from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import {connect} from 'react-redux';
import {login} from '../redux/user/userAction';
import LottieView from 'lottie-react-native';

const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(12)
    .matches(/^[a-zA-Z0-9_]*$/, 'Must Be Alphanumeric Characters'),
});

/**
 * @author Nilesh Ganpat Chavan
 * @param {user, isLoading,error,login,navigation}: user is a object coming from redux contains user information if user has logged in successfully. isLoading is a boolean value coming from redux which may be true if app is making api call and false if no api call is running for login operation. error is an object coming from redux contains status code and message if any error happens while performing signin. navigation is a object which is use to navigate between different screens.
 * @description login screen is use to take inputs to perform login into application for registered users.
 * @return jsx which is used to display content to perform authentication.
 */

function Login({user, isLoading, error, loginFn, navigation}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [eyeStyle, setEyeStyle] = useState('eye-slash');

  const handleEyeClick = () => {
    setSecurePassword(!securePassword);
    if (eyeStyle === 'eye-slash') {
      setEyeStyle('eye');
    } else {
      setEyeStyle('eye-slash');
    }
  };

  return isLoading === false ? (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {user.token && navigation.navigate('HomeDrawer')}
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 60,
            backgroundColor: 'white',
          }}>
          <View style={styles.container}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={(values, action) => {
                loginFn(values);
              }}>
              {(formikProps) => (
                <View style={styles.mainDiv}>
                  <Text style={styles.companyName}>
                    Neo
                    <Text style={{color: '#FF0000', color: '#2874F0'}}>
                      STORE
                    </Text>
                  </Text>
                  <View style={styles.card}>
                    <View style={styles.cardContent}>
                      <View style={{marginBottom: 15}}>
                        <FontAwesome5
                          name={'envelope'}
                          color={'black'}
                          solid
                          size={18}
                          style={{
                            position: 'absolute',
                            left: 14,
                            paddingTop: 18,
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
                              position: 'absolute',
                              left: 14,
                              paddingTop: 2,
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
                            name={eyeStyle}
                            color={'black'}
                            solid
                            size={18}
                            style={{
                              position: 'absolute',
                              right: 13,
                              paddingTop: 2,
                              opacity: 0.6,
                            }}
                            onPress={() => handleEyeClick()}
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

                      <View style={styles.buttonDiv}>
                        <View style={styles.button}>
                          <FlatButton
                            title="Login"
                            disabled={!formikProps.isValid}
                            color={!formikProps.isValid ? 'gray' : '#2874F0'}
                            onPress={formikProps.handleSubmit}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'center',
                          marginTop: 17,
                        }}>
                        <TouchableOpacity
                          onPress={() => {
                            navigation.navigate('ForgotPassword');
                          }}>
                          <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                            Forget Password?
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <View style={styles.createAccountView}>
                    <View style={styles.createAccountInnerView}>
                      <Text style={{fontSize: 18, marginRight: 15}}>
                        DON'T HAVE AN ACCOUNT?
                      </Text>
                      <FontAwesome5
                        name={'plus-square'}
                        color={'#FF0000'}
                        color={'#2874F0'}
                        solid
                        size={50}
                        style={{
                          opacity: 0.8,
                        }}
                        onPress={() => {
                          navigation.navigate('RegisterDrawer');
                        }}
                      />
                    </View>
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </View>
  ) : (
    <View
      style={{
        ...styles.container,
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mainDiv: {
    flex: 1,
    height: '93%',
    maxWidth: 600,
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: 'white',
    paddingVertical: 20,
  },
  companyName: {
    textAlign: 'center',
    fontSize: 35,
    color: 'black',
    fontWeight: 'bold',
  },

  card: {
    marginHorizontal: 10,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 40,
  },
  cardHeading: {
    fontSize: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 12,
    fontSize: 16,
    paddingLeft: 43,
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
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
  },

  createAccountView: {
    width: '100%',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountInnerView: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
    isLoading: state.userReducer.isLoading,
    error: state.userReducer.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginFn: (user) => dispatch(login(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
