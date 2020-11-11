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

export const getAllCategoriesData = () => {
  return (dispatch) => {
    dispatch({type: GETALLCATEGORIES_REQUEST});
    axios
      .get(`${baseUrl}/${getAllCategories}`)
      .then((res) => {
        // console.log(res);
        dispatch({type: GETALLCATEGORIES_SUCCESS, data: res.data});
      })
      .catch((e) => {
        dispatch({
          type: GETALLCATEGORIES_FAILURE,
          data: 'Something Went Wrong, Please Try Again Later',
        });
        // console.log('Category', e, e.response);
      });
  };
};

export const getDefaultTopRatingProducts = () => {
  return (dispatch) => {
    dispatch({type: GETTOPRATINGPRODUCT_REQUEST});
    axios
      .get(`${baseUrl}/${defaultTopRatingProduct}`)
      .then((res) => {
        // console.log(res);
        dispatch({type: GETTOPRATINGPRODUCT_SUCCESS, data: res.data});
      })
      .catch((e) => {
        dispatch({
          type: GETTOPRATINGPRODUCT_FAILURE,
          data: 'Something Went Wrong, Please Try Again Later',
        });
        // console.log('Category', e, e.response);
      });
  };
};
