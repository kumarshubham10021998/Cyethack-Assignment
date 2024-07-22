import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // Import the combined reducer

const store = createStore(rootReducer, applyMiddleware(thunk));

export const StoreProvider = ({ children }) => (
  <Provider store={store}>
    {children}
  </Provider>
);
