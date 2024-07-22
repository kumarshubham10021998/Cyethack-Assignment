export const SET_ITEMS = 'SET_ITEMS';
export const SET_SELECTED_ITEM = 'SET_SELECTED_ITEM';
export const ADD_PROFILE = 'ADD_PROFILE';
export const UPDATE_PROFILE = 'UPDATE_PROFILE';
export const DELETE_PROFILE = 'DELETE_PROFILE';
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

// Action Creators
export const updateProfile = (id, updatedProfile) => ({
  type: UPDATE_PROFILE,
  payload: { id, updatedProfile },
});

export const deleteProfile = (id) => ({
  type: DELETE_PROFILE,
  payload: id,
});