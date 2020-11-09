import axios from 'axios';
import {
  ADD_PRODUCT_TO_CART,
  ADD_PRODUCT_TO_CART_CHECKOUT,
  BUY_PRODUCT,
  DECREMENT_QUANTITY,
  DELETE_PRODUCT_FROM_CART,
  GET_USERADDRESS_FAI,
  GET_USERADDRESS_REQ,
  GET_USERADDRESS_SUC,
  GET_USER_CART,
  GET_USER_ORDER_DETAILS,
  INCREMENT_QUANTITY,
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
  productToCartCheckout,
  deleteCustomerCart,
  getCustOrderDetails,
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

export const incrementQuantity = (productId) => {
  return {
    type: INCREMENT_QUANTITY,
    data: productId,
  };
};

export const decrementQuantity = (productId) => {
  return {
    type: DECREMENT_QUANTITY,
    data: productId,
  };
};

export const deleteProductFromCart = (productId, token) => {
  if (token === undefined) {
    return {
      type: DELETE_PRODUCT_FROM_CART,
      data: productId,
    };
  }

  return (dispatch) => {
    axios
      .delete(`${baseUrl}/${deleteCustomerCart}/${productId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Delete Success Res ', res);
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          data: productId,
        });
      })
      .catch((e) => {
        console.log('Delete Error ', e, e.response);
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          data: productId,
        });
      });
  };
};

export const addProductToCartCheckout = (cartData, token) => {
  console.log('Cart Data ', cartData, token);

  const cart = [...cartData];

  cart.push({flag: 'logout'});

  return (dispatch) => {
    axios
      .post(`${baseUrl}/${productToCartCheckout}`, cart, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('Inside Cart Action', res);
        dispatch({
          type: ADD_PRODUCT_TO_CART_CHECKOUT,
          data: res,
        });
      })
      .catch((e) => {
        console.log('cart Error', e, e.response);
      });
  };
};

export const buyProduct = () => {
  console.log('This is ---');

  return {type: BUY_PRODUCT};
};

export const getCustomerOrderDetails = (token) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/${getCustOrderDetails}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        console.log('This is i want', res.data.product_details);
        dispatch({
          type: GET_USER_ORDER_DETAILS,
          data: res.data.product_details,
        });
      })
      .catch((e) => {
        console.log('This is error', e, e.response);
      });
  };
};
