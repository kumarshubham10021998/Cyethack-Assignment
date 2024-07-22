export const SET_ITEMS = 'SET_ITEMS';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';
export const ADD_PROFILE = 'ADD_PROFILE';

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setSelectedItem = (item) => ({
  type: SET_SELECTED_ITEM,
  payload: item,
});

export const addProfile = (profile) => ({
  type: ADD_PROFILE,
  payload: profile,
});
