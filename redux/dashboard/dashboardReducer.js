import {
  GETALLCATEGORIES_FAILURE,
  GETALLCATEGORIES_SUCCESS,
  GETALLCATEGORIES_REQUEST,
  GETTOPRATINGPRODUCT_FAILURE,
  GETTOPRATINGPRODUCT_REQUEST,
  GETTOPRATINGPRODUCT_SUCCESS,
} from './types';

const initialState = {
  categories: [],
  topRatedProduct: [],
  isLoading: true,
  error: null,
};

/**
 * @author Nilesh Ganpat Chavan
 * @param {state,action} : state is initialState of redux store and action contains information passed by action creater.
 * @description this function performs changes in redux state.
 * @returns function new state after performing changes in redux state.
 */

const dashBoardReducer = (state = initialState, action) => {
  switch (action.type) {
    case GETALLCATEGORIES_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GETALLCATEGORIES_SUCCESS:
      return {
        ...state,
        error: null,
        categories: action.data.category_details,
      };

    case GETALLCATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false,
        categories: [],
        error: action.data,
      };

    case GETTOPRATINGPRODUCT_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case GETTOPRATINGPRODUCT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        topRatedProduct: action.data.product_details,
      };

    case GETTOPRATINGPRODUCT_FAILURE:
      return {
        ...state,
        isLoading: false,
        topRatedProduct: [],
        error: action.data,
      };

    default:
      return state;
  }
};

export default dashBoardReducer;
