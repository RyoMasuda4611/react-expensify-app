import { createStore } from 'redux';

// {} = {} とすれば値が渡されなかった時でもundefindeが渡されてエラーにはならない
const incrementCount = ({incrementBy = 1} = {}) => ({
  type:'INCREMENT',
  incrementBy:  typeof incrementBy === 'number' ? incrementBy : 1
});

const decrementCount = ({decrementBy = 1} = {}) => ({
  type:'DECREMENT',
  decrementBy: typeof decrementBy === 'number' ? decrementBy : 1
});

const resetCount = () => ({
  type: 'RESET'
});

const setCount = ({count = 0}={}) => ({
  type: 'SET',
  count
});

const store = createStore((state = { count:0 }, action) => {
  switch(action.type){
    case 'INCREMENT':
      return {
        count: state.count + action.incrementBy
      }
    case 'DECREMENT':
      return {
        count: state.count - action.decrementBy
      }
    case 'RESET':
      return {
          count: 0
      }
    case 'SET':
      return {
        count: action.count
      }
    default:
      return state;
  }
});

const unsubscribe = store.subscribe(() => {
  console.log(store.getState());
});

store.dispatch(incrementCount({incrementBy: 23}));

store.dispatch(decrementCount({decrementBy: 8}));

store.dispatch(resetCount());

store.dispatch(setCount({count: 120}));
