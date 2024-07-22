
import { combineReducers } from 'redux';
import itemReducer from './itemReducer';

const userReducer = (state = null, action) => {
  switch (action.type) {
    case 'LOGIN':
      return action.payload;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  user: userReducer,
  items: itemReducer, // Include the itemReducer
});

export default rootReducer;
