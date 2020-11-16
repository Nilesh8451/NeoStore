import React, {useState, useEffect} from 'react';
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
import {login, getUserCartData} from '../redux/user/userAction';
import {globalStyles} from '../shared/globalStyle';
import LoadingScreen from './loadingScreen';
import {useFocusEffect} from '@react-navigation/native';

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
 * @param {user, isLoading,error,login,navigation} props user is a object coming from redux contains user information if user has logged in successfully. isLoading is a boolean value coming from redux which may be true if app is making api call and false if no api call is running for login operation. error is an object coming from redux contains status code and message if any error happens while performing signin. navigation is a object which is use to navigate between different screens.
 * @description login screen is use to take inputs to perform login into application for registered users.
 * @return jsx which is used to display content to perform authentication.
 */

function Login({
  user,
  isLoading,
  error,
  loginFn,
  getDataOfUserCart,
  navigation,
}) {
  const [securePassword, setSecurePassword] = useState(true);
  const [eyeStyle, setEyeStyle] = useState('eye-slash');
  const [reloadKey, setReloadKey] = useState(1);

  const handleEyeClick = () => {
    setSecurePassword(!securePassword);
    if (eyeStyle === 'eye-slash') {
      setEyeStyle('eye');
    } else {
      setEyeStyle('eye-slash');
    }
  };

  useFocusEffect(() => {
    setReloadKey(2);
    return () => {
      setReloadKey(1);
    };
  }, []);

  if (user?.token) {
    getDataOfUserCart(user.token);
    navigation.navigate('HomeDrawer');
  }

  return isLoading === false ? (
    <View key={reloadKey} style={{flex: 1, backgroundColor: 'white'}}>
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <ScrollView
          contentContainerStyle={{
            paddingVertical: 60,
            backgroundColor: 'white',
          }}>
          <View style={globalStyles.authContainer}>
            <Formik
              initialValues={{email: '', password: ''}}
              validationSchema={loginSchema}
              onSubmit={(values, action) => {
                loginFn(values);
              }}>
              {(formikProps) => (
                <View style={styles.mainDiv}>
                  <Text style={globalStyles.companyName}>
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
                          style={globalStyles.input}
                          placeholder="Email"
                          value={formikProps.values.email}
                          onChangeText={formikProps.handleChange('email')}
                          onBlur={formikProps.handleBlur('email')}
                        />

                        {formikProps.touched.email && formikProps.errors.email && (
                          <Text
                            style={{
                              ...globalStyles.errorText,
                              marginBottom: 10,
                            }}>
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
                            style={globalStyles.input}
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
                            <Text
                              style={{
                                ...globalStyles.errorText,
                                marginBottom: 10,
                              }}>
                              {formikProps.touched.password &&
                                formikProps.errors.password}
                            </Text>
                          )}
                      </View>

                      <View style={globalStyles.authButtonDiv}>
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
    <LoadingScreen />
  );
}

const styles = StyleSheet.create({
  mainDiv: {
    flex: 1,
    height: '93%',
    width: '90%',
    maxWidth: 600,
    justifyContent: 'center',
    marginTop: 0,
    backgroundColor: 'white',
    paddingVertical: 20,
  },

  card: {
    marginHorizontal: 10,
  },
  cardContent: {
    marginHorizontal: 15,
    marginVertical: 40,
  },

  button: {},
  oppositeBut: {},

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
    getDataOfUserCart: (token) => dispatch(getUserCartData(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
