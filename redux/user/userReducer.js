import {
  LOGIN_SUCCESS,
  LOGIN_REQUEST,
  LOGIN_FAILURE,
  RESTORE_LOGINDATA,
  SIGNOUT,
  UPDATE_USERINFO,
  GET_USERADDRESS_SUC,
  GET_USERADDRESS_REQ,
  GET_USERADDRESS_FAI,
  ADD_PRODUCT_TO_CART,
  GET_USER_CART,
  INCREMENT_QUANTITY,
  DECREMENT_QUANTITY,
  DELETE_PRODUCT_FROM_CART,
  ADD_PRODUCT_TO_CART_CHECKOUT,
  BUY_PRODUCT,
  GET_USER_ORDER_DETAILS,
  RESTORE_USERCART_DATA,
  PROFILE_ERROR,
} from './types';
import Toast from 'react-native-simple-toast';
import {act} from 'react-test-renderer';

const initialState = {
  user: {},
  userAddress: [],
  cart: [],
  order: [],
  isLoading: false,
  addressLoading: false,
  error: null,
  profileError: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
        isLoading: false,
        error: null,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        user: {},
        isLoading: false,
        error: action.data,
      };

    case RESTORE_LOGINDATA:
      return {
        ...state,
        user: action.data,
        isLoading: false,
        error: null,
      };

    case UPDATE_USERINFO:
      return {
        ...state,
        user: action.data,
        isLoading: false,
        error: null,
      };

    case GET_USERADDRESS_REQ:
      return {
        ...state,
        addressLoading: true,
      };

    case GET_USERADDRESS_SUC:
      return {
        ...state,
        addressLoading: false,
        userAddress: action.data,
      };

    case GET_USERADDRESS_FAI:
      return {...state, addressLoading: false, userAddress: []};

    case SIGNOUT:
      Toast.show('Successfully Logout', Toast.LONG);
      return {
        ...state,
        user: {},
        isLoading: false,
        error: null,
        cart: [],
      };

    case GET_USER_CART: {
      // console.log('Inside', action.data);
      const addPrevToUserCart = [];

      state.cart.map((prodC) => {
        let index = action.data.findIndex((productU) => {
          return productU.product_id == prodC.product_id;
        });

        if (index == -1) {
          addPrevToUserCart.push(prodC);
        }
      });

      // console.log(addPrevToUserCart, action.data);
      return {
        ...state,
        cart: [...addPrevToUserCart, ...action.data],
      };
    }

    case ADD_PRODUCT_TO_CART: {
      let index = state.cart.findIndex((prod) => {
        return prod.product_id == action.data.product_id;
      });

      if (index == -1) {
        Toast.show('Added To Cart Successfully', Toast.SHORT);
        return {
          ...state,
          cart: [...state.cart, action.data],
        };
      } else {
        Toast.show('Already Added To Cart', Toast.LONG);
        return state;
      }
    }

    case INCREMENT_QUANTITY: {
      let newCart = state.cart.map((prod) => {
        if (prod.product_id != action.data) {
          return prod;
        } else {
          let prodO = prod;
          prodO.quantity += 1;
          prodO.total += prodO.product_cost;
          return prodO;
        }
      });

      // console.log(newCart);

      return {
        ...state,
        cart: newCart,
      };
    }

    case DECREMENT_QUANTITY: {
      let newCart = state.cart.map((prod) => {
        if (prod.product_id != action.data) {
          return prod;
        } else {
          let prodO = prod;
          prodO.quantity -= 1;
          prodO.total -= prodO.product_cost;
          return prodO;
        }
      });

      return {
        ...state,
        cart: newCart,
      };
    }

    case DELETE_PRODUCT_FROM_CART: {
      let newCart = state.cart.filter((prod) => {
        return prod.product_id != action.data;
      });

      return {...state, cart: newCart};
    }

    case ADD_PRODUCT_TO_CART_CHECKOUT: {
      return state;
    }

    case BUY_PRODUCT: {
      // console.log('Product BUYING');
      return {
        ...state,
        cart: [],
      };
    }

    case GET_USER_ORDER_DETAILS: {
      // console.log('User Order ', action.data);
      return {
        ...state,
        profileError: null,
        order: action.data,
      };
    }

    case PROFILE_ERROR: {
      return {...state, profileError: 'Something Went Wrong'};
    }

    case RESTORE_USERCART_DATA: {
      console.log('Cart Data Restored ', action.data);
      return {
        ...state,
        cart: action.data,
      };
    }

    default:
      return state;
  }
};

export default userReducer;
