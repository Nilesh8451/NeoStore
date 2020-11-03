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
} from './types';
import Toast from 'react-native-simple-toast';

const initialState = {
  user: {},
  userAddress: [],
  isLoading: false,
  error: null,
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
        isLoading: true,
      };

    case GET_USERADDRESS_SUC:
      return {
        ...state,
        isLoading: false,
        userAddress: action.data,
      };

    case GET_USERADDRESS_FAI:
      return {...state, isLoading: false};

    case SIGNOUT:
      Toast.show('Successfully Logout', Toast.LONG);
      return {
        ...state,
        user: {},
        isLoading: false,
        errro: null,
      };

    default:
      return state;
  }
};

export default userReducer;
