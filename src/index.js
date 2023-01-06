import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { createStore } from "redux";

const root = ReactDOM.createRoot(document.getElementById('root'));

// we define the initial redux state
const initialState = {
  query: "",
  fetching: false,
  results: [],
  totalResults:0,
  page:1,
  pageCounter: 11,
};

//we tell redux what pieces of states we'll change according to the action 
const reducer = (state = initialState, action) => {

//this happened when the search button was pressed
  if (action.type === "IMAGE_SEARCH_STARTED") {
    return Object.assign({}, state, {
      query: action.payload,
      page: 1,
      fetching: true
    });
  }

//this happened when the results were loaded
  if (action.type === "IMAGE_SEARCH_FINISHED") {
    return Object.assign({}, state, {
      results: action.payload.photo.map(item => ({
        id: item.id,
        url: item.url_m,
        title: item.title,
      })),
      totalResults: action.payload.total,
      page: action.payload.page,
      fetching: false
    });
  }

//this happened when the user pressed next in the pagination set of numbers
  if (action.type === "PAGINATION_INCREASE_SET") {
    return Object.assign({}, state, {
      pageCounter: action.payload,
    });
  }

//this happened when the user pressed previous in the pagination set of numbers  
  if (action.type === "PAGINATION_DECREASE_SET") {
    return Object.assign({}, state, {
      pageCounter: action.payload,
    });
  }

  // don't forget to always return state
  return state;
};

// here we create our redux store instance, and add the redux chrome extension
const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


root.render(
  <React.StrictMode>
    <App store={store} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();