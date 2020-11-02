import {createStore, combineReducers, applyMiddleware} from 'redux';
import dashBoardReducer from './dashboard/dashboardReducer';
import userReducer from './user/userReducer';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  userReducer: userReducer,
  dashBoardReducer: dashBoardReducer,
});

const configureStore = () => createStore(rootReducer, applyMiddleware(thunk));

export default configureStore;
