import React, {useEffect, useState} from 'react';
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
import Toast from 'react-native-simple-toast';

const loginSchema = yup.object({
  email: yup.string().required().email(),
  password: yup
    .string()
    .required()
    .min(8)
    .max(12)
    .matches(/^[a-zA-Z0-9_]*$/, 'Must Be Alphanumeric Characters'),
});

function Login({navigation}) {
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

  return (
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
              console.log(values);
              Toast.show('Login Successfully', Toast.LONG);
              navigation.navigate('HomeDrawer');
              action.resetForm();
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
                          // 2874F0
                          // FF0000
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
                          console.log('Forget Password');
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
                        console.log('Registration Navigation');
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
  );
}

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    justifyContent: 'flex-end',
  },
  mainDiv: {
    flex: 1,
    height: '93%',
    maxWidth: 600,
    justifyContent: 'center',
    // alignItems: 'center',
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
    // marginTop: 20,
    // backgroundColor: 'red',
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
    // marginTop: 10,
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
  button: {
    // marginRight: 20,
  },
  oppositeBut: {},
  errorText: {
    color: 'red',
    marginBottom: 10,
    marginTop: 5,
    marginLeft: 5,
    textTransform: 'capitalize',
  },

  createAccountView: {
    // position: 'relative',
    // bottom: 0,
    width: '100%',
    marginTop: 20,
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  createAccountInnerView: {
    width: '85%',
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Login;
