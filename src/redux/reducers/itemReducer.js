import { ADD_PROFILE, SET_ITEMS, SET_SELECTED_ITEM, UPDATE_PROFILE, DELETE_PROFILE } from '../actions/itemActions';

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
    case UPDATE_PROFILE:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, ...action.payload.updatedProfile } : item
        ),
      };
    case DELETE_PROFILE:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default itemReducer;
