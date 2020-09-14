/*
 * @Author: zting
 * @LastEditors: zting
 * @Description: file content
 */
// import styles from './index.css';
import React, { useReducer, createContext } from 'react';
import { pageReducer, navReducer,pageState,navState } from '../reducer'
import { combineReducers } from '../utils';
export const AppContext = createContext({})
const { Provider } = AppContext

function BasicLayout(props) {

  const reducer = combineReducers({pageReducer,navReducer})
  const store = useReducer(reducer,{pageReducer:pageState,navReducer:navState})
  return (
    <Provider value={store} >
      <div>
        {props.children}
      </div>
    </Provider>
  );
}

export default BasicLayout;
