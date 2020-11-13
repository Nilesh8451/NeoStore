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
  PROFILE_ERROR,
  RESTORE_LOGINDATA,
  RESTORE_USERCART_DATA,
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

/**
 * @author Nilesh Ganpat Chavan
 * @param {user} user contains user information.
 * @description this function stores user information on async storage.
 */

const storeData = async (user) => {
  try {
    await AsyncStorage.setItem('userInfo', JSON.stringify(user));
  } catch (e) {}
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {user} user contains user information.
 * @description this function stores user information in redux store.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

export const restoreLoginData = (user) => {
  return (dispatch) => {
    dispatch({type: RESTORE_LOGINDATA, data: user});
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {user} user contains user credential such as email and password.
 * @description this function perform login functionality in app and store user information if successfully login is done else store error occured while performing login.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

export const login = (user) => {
  return (dispatch) => {
    dispatch({type: LOGIN_REQUEST});
    axios
      .post(`${baseUrl}/${loginEndPoint}`, {
        email: user.email,
        pass: user.password,
      })
      .then((res) => {
        // console.log("Login Success Response ",res);
        storeData(res.data);
        dispatch({type: LOGIN_SUCCESS, data: res.data});
        Toast.show('Successfully Login', Toast.LONG);
      })
      .catch((e) => {
        // console.log('Login Error ', e.response);
        if (e.response?.data?.message == undefined) {
          Alert.alert('OPPS!', 'Something went wrong, Please try again later!');
        } else {
          Alert.alert('OOPS!', e.response.data.message);
        }

        dispatch({type: LOGIN_FAILURE, data: e});
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @description this function remove user information stored in async storage and set cart data in async storage.
 */

const removeData = async () => {
  const data = [];
  try {
    await AsyncStorage.removeItem('userInfo');
    await AsyncStorage.setItem('userCartData', JSON.stringify(data));
  } catch (e) {}
};

/**
 * @author Nilesh Ganpat Chavan
 * @description this function perform signout functionality.
 * @returns object contains action type.
 */

export const signOut = () => {
  removeData();
  return {
    type: SIGNOUT,
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {cus_detail} cus_detail contains user updated information that user is trying to update.
 * @description this function perform update on user information and dispatches an action in redux.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

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

/**
 * @author Nilesh Ganpat Chavan
 * @param {token} token contains user credentials to perform profile specific operation.
 * @description this function fetches user address from database and dispatch action to store that address in store.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

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
        // console.log('Get User Address Response ', res.data);
        dispatch({type: GET_USERADDRESS_SUC, data: res.data.customer_address});
        //
      })
      .catch((e) => {
        // console.log("Get User Address Error ",e, e.response);
        dispatch({type: GET_USERADDRESS_FAI});
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {cartData} cartData contains cart items.
 * @description this function stores cart items in async storage.
 */

const storeCartData = async (cartData) => {
  try {
    await AsyncStorage.setItem('userCartData', JSON.stringify(cartData));
  } catch (e) {}
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {cartData} cartData contains cart items.
 * @description this function stores cart data in redux store.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

export const restoreUserCartData = (cartData) => {
  return (dispatch) => {
    dispatch({type: RESTORE_USERCART_DATA, data: cartData});
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {token} token contains user credentials.
 * @description this function fetches user cart data from database and dispatches specific action.
 * @returns function that accepts dispatch function to dispatch some action in redux.
 */

export const getUserCartData = (token) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/${getUserCart}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('Get User Cart Data Response ', res.data);
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

          storeCartData(cartData);

          dispatch({type: GET_USER_CART, data: cartData});
        }
      })
      .catch((e) => {
        // console.log('Get User Cart Data Error ', e, e.response);
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {product} product object which contains product details.
 * @description this function add product to cart.
 * @returns object that contains action type and data that we have to store in redux state.
 */

export const addProductToCart = (product) => {
  product.total = product.product_cost;
  product.quantity = 1;
  return {type: ADD_PRODUCT_TO_CART, data: product};
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {productId} productId is id of product.
 * @description this function perform increment on quantity of product.
 * @returns object that contains action type and product id on which we have to perform increment quantity.
 */

export const incrementQuantity = (productId) => {
  return {
    type: INCREMENT_QUANTITY,
    data: productId,
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {productId} productId is id of product.
 * @description this function perform decrement on quantity of product.
 * @returns object that contains action type and product id on which we have to perform decrement quantity.
 */

export const decrementQuantity = (productId) => {
  return {
    type: DECREMENT_QUANTITY,
    data: productId,
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {productId,token}:  productId is id of product and token is user credentials.
 * @description this function perform deletion of product from cart.
 * @returns function that accepts dispatch function to dispatch redux action.
 */

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
        // console.log('Delete Customer Cart Response ', res);
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          data: productId,
        });
      })
      .catch((e) => {
        // console.log('Delete Customer Cart Error ', e, e.response);
        dispatch({
          type: DELETE_PRODUCT_FROM_CART,
          data: productId,
        });
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {cartData,token}: cartData is array of product, token is logged in user credentials.
 * @description this function perform buying of product functionality.
 * @returns function that accepts dispatch function to dispatch any actions.
 */

export const addProductToCartCheckout = (cartData, token) => {
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
        // console.log('Add Product To Cart Checkout Response ', res);
        dispatch({
          type: ADD_PRODUCT_TO_CART_CHECKOUT,
          data: res,
        });
      })
      .catch((e) => {
        // console.log('Add Product To Cart Checkout Error', e, e.response);
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @description this function empties the user cart after successful buying of product.
 * @returns object that contains action type.
 */

export const buyProduct = () => {
  return {type: BUY_PRODUCT};
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {token} token is logged in user information.
 * @description this function fetches order details of specific order of user.
 * @returns function that accepts dispatch function to dispatch any actions.
 */

export const getCustomerOrderDetails = (token) => {
  return (dispatch) => {
    axios
      .get(`${baseUrl}/${getCustOrderDetails}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((res) => {
        // console.log('Get Customer Order Detail Response ', res.data.product_details);
        dispatch({
          type: GET_USER_ORDER_DETAILS,
          data: res.data.product_details,
        });
      })
      .catch((e) => {
        // console.log('Get Customer Order Detail Error', e, e.response);
        dispatch({type: PROFILE_ERROR});
      });
  };
};
