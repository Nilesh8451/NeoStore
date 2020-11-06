import axios from 'axios';
import {
  ADD_PRODUCT_TO_CART,
  GET_USERADDRESS_FAI,
  GET_USERADDRESS_REQ,
  GET_USERADDRESS_SUC,
  GET_USER_CART,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  RESTORE_LOGINDATA,
  SIGNOUT,
  UPDATE_USERINFO,
} from './types';
import {
  baseUrl,
  loginEndPoint,
  getUserAddress,
  getUserCart,
} from '../../baseUrl';
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
        // getUserCartData(res.data.token);
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

export const getUserCartData = (token) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/${getUserCart}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Success', res.data);
        if (
          res.data.message !=
          'Your cart is empty. Please, first add products on your cart'
        ) {
          const cartData = res.data.product_details.map((prod) => {
            const dataobj = prod.product_id;
            dataobj.quantity = prod.quantity;
            dataobj.total = parseInt(prod.total_productCost);
            return dataobj;
          });

          console.log('Change Cart Format', cartData);

          dispatch({type: GET_USER_CART, data: cartData});
        }
      })
      .catch((e) => {
        console.log('Error', e, e.response);
      });
  };
};

export const addProductToCart = (product) => {
  console.log('Product To Cart', product);
  product.total = product.product_cost;
  product.quantity = 1;
  return {type: ADD_PRODUCT_TO_CART, data: product};
};
