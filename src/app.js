import React from 'react';
import ReactDOM from 'react-dom';
import AppRouter from './routers/AppRouter';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import configureStore from './store/configureStore';
import { addExpense } from './actions/expenses';
import { setTextFilter } from './actions/filters';
import getVisibleExpenses from './selectors/expenses';
import { Provider } from 'react-redux';
import 'react-dates/lib/css/_datepicker.css';
const store = configureStore();

store.subscribe(() => {
  const state = store.getState();
  console.log(state);
});

const jsx = (
    <Provider store={store}>
     <AppRouter />
    </Provider>
)

store.dispatch(addExpense({ description: 'water Bill' }));
store.dispatch(addExpense({ description: 'gas Bill', createdAt: 20000000000 }));
store.dispatch(addExpense({ description: 'rent' , note: 'ddddddddddddddddd'}));
// store.dispatch(setTextFilter('water'));

// setTimeout(() => {
//     store.dispatch(setTextFilter('bill'));
// }, 4000);

ReactDOM.render(jsx, document.getElementById('app'));
