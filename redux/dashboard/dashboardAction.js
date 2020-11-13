import {
  baseUrl,
  getAllCategories,
  defaultTopRatingProduct,
} from '../../baseUrl';
import {
  GETALLCATEGORIES_FAILURE,
  GETALLCATEGORIES_SUCCESS,
  GETALLCATEGORIES_REQUEST,
  GETTOPRATINGPRODUCT_REQUEST,
  GETTOPRATINGPRODUCT_FAILURE,
  GETTOPRATINGPRODUCT_SUCCESS,
} from './types';
import axios from 'axios';

/**
 * @author Nilesh Ganpat Chavan
 * @description this function use to get all categories available in NeoSTORE.
 * @returns function which accepts dispatch function to dispatch actions in redux store.
 */

export const getAllCategoriesData = () => {
  return (dispatch) => {
    dispatch({type: GETALLCATEGORIES_REQUEST});
    axios
      .get(`${baseUrl}/${getAllCategories}`)
      .then((res) => {
        // console.log('Category Response ',res);
        dispatch({type: GETALLCATEGORIES_SUCCESS, data: res.data});
      })
      .catch((e) => {
        dispatch({
          type: GETALLCATEGORIES_FAILURE,
          data: 'Something Went Wrong, Please Try Again Later',
        });
        // console.log('Category Error', e, e.response);
      });
  };
};

/**
 * @author Nilesh Ganpat Chavan
 * @description this function use to get to rated product available in NeoSTORE.
 * @returns function which accepts dispatch function to dispatch actions in redux store.
 */

export const getDefaultTopRatingProducts = () => {
  return (dispatch) => {
    dispatch({type: GETTOPRATINGPRODUCT_REQUEST});
    axios
      .get(`${baseUrl}/${defaultTopRatingProduct}`)
      .then((res) => {
        // console.log("Top Rated Product Response",res);
        dispatch({type: GETTOPRATINGPRODUCT_SUCCESS, data: res.data});
      })
      .catch((e) => {
        dispatch({
          type: GETTOPRATINGPRODUCT_FAILURE,
          data: 'Something Went Wrong, Please Try Again Later',
        });
        // console.log('Top Rated Product Error', e, e.response);
      });
  };
};
