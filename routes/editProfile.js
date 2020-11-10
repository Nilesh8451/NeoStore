import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {Avatar} from 'react-native-elements';
import FlatButton from '../shared/button';
import {Formik} from 'formik';
import Toast from 'react-native-simple-toast';
import * as yup from 'yup';
import ImagePicker from 'react-native-image-picker';
import RadioForm from 'react-native-simple-radio-button';
import {connect} from 'react-redux';
import {updateUserInformation} from '../redux/user/userAction';
import axios from 'axios';
import {baseUrl, updateProfile} from '../baseUrl';
import LottieView from 'lottie-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const profileSchema = yup.object({
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

function EditProfile(props) {
  const [imgData, setImgData] = useState({});
  const [loadingAPI, setLoadingAPI] = useState(false);
  const [dob, setDob] = useState(new Date(1598051730000));
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate, formikProp) => {
    const currentDate = selectedDate || dob;
    const convertedDate = moment(currentDate).format('L');
    setShow(false);
    formikProp.setFieldValue('dob', convertedDate);
  };

  // console.log('User ', props.user);

  const userDetail = props.user.customer_details;
  // console.log('SSSSSSSSSSS ', userDetail);

  const handleChooseFile = () => {
    const options = {};
    ImagePicker.launchImageLibrary(options, (response) => {
      // console.log('Response ', response);
      if (response?.didCancel !== true) {
        setImgData(response);
      }
    });
  };

  const updateProfileData = (data) => {
    setLoadingAPI(true);

    axios
      .put(`${baseUrl}/${updateProfile}`, data, {
        headers: {
          Authorization: `bearer ${props.user.token}`,
        },
      })
      .then((res) => {
        // console.log('This is update res', res);
        props.updateInfo(res.data.customer_details);
        setLoadingAPI(false);
        Toast.show('Detail Updated Successfully', Toast.LONG);
        props.navigation.pop();
      })
      .catch((e) => {
        setLoadingAPI(false);
        // console.log('Update Error', e);
      });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      {loadingAPI ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
        </View>
      ) : (
        <ScrollView>
          <View
            style={{
              width: '100%',
              // backgroundColor: 'pink',
              paddingTop: 30,
              paddingBottom: 10,
              alignItems: 'center',
            }}>
            {imgData.uri ? (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderColor: '#2874F0',
                  borderWidth: 1,
                }}
                source={{uri: imgData.uri}}
              />
            ) : (
              <Image
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  borderColor: '#2874F0',
                  borderWidth: 1,
                }}
                source={
                  props?.user.customer_details?.profile_img
                    ? {
                        uri: `${baseUrl}/${props.user.customer_details.profile_img}`,
                      }
                    : require('../assets/images/userDefaultImage.png')
                }
              />
            )}

            <TouchableOpacity onPress={handleChooseFile}>
              <Text style={{fontSize: 18, marginTop: 10, color: 'blue'}}>
                Change Photo
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              // backgroundColor: 'pink',
              marginTop: 10,
              width: '100%',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Formik
              initialValues={{
                firstname: userDetail?.first_name,
                lastname: userDetail?.last_name,
                email: userDetail?.email,
                phoneno: userDetail.phone_no,
                gender: userDetail.gender,
                dob: userDetail.dob || '01/01/1999',
              }}
              validationSchema={profileSchema}
              onSubmit={(values, action) => {
                // console.log(values);
                // console.log(props.user.token);

                const data = new FormData();
                data.append('first_name', values.firstname);
                data.append('last_name', values.lastname);
                data.append('email', values.email);
                data.append('dob', values.dob);
                data.append('phone_no', values.phoneno);
                data.append('gender', values.gender);

                if (imgData.data) {
                  // console.log('Adding', imgData.data);
                  const imageData = 'data:image/jpeg;base64,' + imgData.data;
                  data.append('profile_img', imageData);
                }

                if (!imgData.data) {
                  Alert.alert('OOPS!', 'Please Select New Profile Image');
                } else {
                  updateProfileData(data);
                }
              }}>
              {(formikProps) => (
                <View style={{width: '77%', marginBottom: 25, maxWidth: 450}}>
                  <TextInput
                    style={styles.input}
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
                  <TextInput
                    style={styles.input}
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
                  <TextInput
                    editable={false}
                    style={styles.input}
                    value={formikProps.values.email}
                    onChangeText={formikProps.handleChange('email')}
                    onBlur={formikProps.handleBlur('email')}
                  />
                  {formikProps.touched.email && formikProps.errors.email && (
                    <Text style={styles.errorText}>
                      {formikProps.touched.email && formikProps.errors.email}
                    </Text>
                  )}

                  <TextInput
                    style={styles.input}
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

                  <View
                    style={{
                      height: 40,
                      marginTop: 15,
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingHorizontal: 10,
                      borderBottomColor: 'gray',
                      borderBottomWidth: 1,
                    }}>
                    <Text style={{fontSize: 17}}>{formikProps.values.dob}</Text>
                    <FontAwesome5
                      name={'calendar-alt'}
                      color={'black'}
                      solid
                      size={18}
                      onPress={() => {
                        setShow(true);
                      }}
                    />
                  </View>

                  {show && (
                    <DateTimePicker
                      testID="dateTimePicker"
                      maximumDate={new Date()}
                      value={dob}
                      mode={'date'}
                      // display="default"
                      onChange={(e, val) => onChangeDate(e, val, formikProps)}
                    />
                  )}

                  <View style={{alignItems: 'flex-start'}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        marginTop: 25,
                        marginLeft: 6,
                      }}>
                      <RadioForm
                        style={{
                          flexDirection: 'row',
                        }}
                        animation={false}
                        labelStyle={{marginRight: 10}}
                        buttonSize={15}
                        radio_props={radio_props}
                        initial={
                          formikProps.values.gender.toLowerCase() === 'male'
                            ? 0
                            : 1
                        }
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

                  <View style={{marginTop: 25}}>
                    <FlatButton
                      title="Update"
                      disabled={!formikProps.isValid}
                      color={!formikProps.isValid ? 'gray' : '#2874F0'}
                      onPress={() => {
                        formikProps.handleSubmit();
                      }}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    // borderWidth: 1,
    borderBottomWidth: 0.8,
    borderBottomColor: 'gray',
    backgroundColor: 'white',
    borderColor: 'gray',
    marginTop: 9,
    padding: 8,
    paddingHorizontal: 10,
    fontSize: 17,
    borderRadius: 2,
  },
  errorText: {
    color: 'red',
    marginBottom: 2,
    marginTop: 5,
    marginLeft: 10,
    opacity: 0.7,
    textTransform: 'capitalize',
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.userReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateInfo: (cus_detail) => dispatch(updateUserInformation(cus_detail)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);
