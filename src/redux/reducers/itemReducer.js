import { ADD_PROFILE, SET_ITEMS, SET_SELECTED_ITEM } from '../actions/itemActions';

const initialState = {
  items: [],
  selectedItem: null,
};

const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case SET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload,
      };
    case ADD_PROFILE:
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    default:
      return state;
  }
};

export default itemReducer;
