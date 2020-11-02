import axios from 'axios';
import {
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESTORE_LOGINDATA,
  SIGNOUT,
} from './types';
import {baseUrl, loginEndPoint} from '../../baseUrl';
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
