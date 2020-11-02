import axios from 'axios';
import {LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, SIGNOUT} from './types';
import {baseUrl, loginEndPoint} from '../../baseUrl';
import {Alert} from 'react-native';
import Toast from 'react-native-simple-toast';

export const login = (user) => {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    axios
      .post(`${baseUrl}/${loginEndPoint}`, {
        email: user.email,
        pass: user.password,
      })
      .then((res) => {
        // storeData(res.data);
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

export const signOut = () => {
  return {
    type: SIGNOUT,
  };
};
