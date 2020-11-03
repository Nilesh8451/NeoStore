import axios from 'axios';
import {
  GET_USERADDRESS_FAI,
  GET_USERADDRESS_REQ,
  GET_USERADDRESS_SUC,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESTORE_LOGINDATA,
  SIGNOUT,
  UPDATE_USERINFO,
} from './types';
import {baseUrl, loginEndPoint, getUserAddress} from '../../baseUrl';
import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storeData = async (user) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  } catch (e) {}
};

export const restoreLoginData = (user) => {
  return (dispatch) => {
    dispatch({type: RESTORE_LOGINDATA, data: user});
  };
};

export const login = (user) => {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    axios
      .post(`${baseUrl}/${loginEndPoint}`, {
        email: user.email,
        pass: user.password,
      })
      .then((res) => {
        storeData(res.data);
        console.log(res);
        dispatch({type: LOGIN_SUCCESS, data: res.data});
        Toast.show('Successfully Login', Toast.LONG);
      })
      .catch((e) => {
        console.log(e.response);
        Alert.alert('OOPS!', e.response.data.message);
        dispatch({type: LOGIN_FAILURE, data: e});
      });
  };
};

const removeData = async () => {
  try {
    await AsyncStorage.removeItem('userInfo');
    console.log('Removed Data');
  } catch (e) {
    console.log(e);
  }
};

export const signOut = () => {
  removeData();
  return {
    type: SIGNOUT,
  };
};

export const updateUserInformation = (cus_detail) => {
  return async (dispatch) => {
    const user = await AsyncStorage.getItem('userInfo');
    let parseUserData = await JSON.parse(user);
    parseUserData.customer_details = cus_detail;

    storeData(parseUserData);

    dispatch({
      type: UPDATE_USERINFO,
      data: parseUserData,
    });
  };
};

export const getCustomerAddress = (token) => {
  return (dispatch) => {
    dispatch({type: GET_USERADDRESS_REQ});

    axios
      .get(`${baseUrl}/${getUserAddress}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('Inside Action', res.data);
        dispatch({type: GET_USERADDRESS_SUC, data: res.data.customer_address});
        //
      })
      .catch((e) => {
        // console.log(e, e.response);
        dispatch({type: GET_USERADDRESS_FAI});
      });
  };
};
