import moment from 'moment';
import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should set up default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove an expense by id', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: expenses[1].id
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove an expense if id is invalid', () => {
  const action = {
    type: 'REMOVE_EXPENSE',
    id: '-1'
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should add an expense ', () => {
  const expense = {
    id: '4',
    description: 'test',
    note: 'test',
    amount: 0,
    createdAt: 0
  };
  const action = {
    type: 'ADD_EXPENSE',
    expense
  };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);  
});

test('should edit an expense', () => {
    const updates = {
      description: 'Updated',
      note:'',
      amount: 0,
      createdAt: 0
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[1].id,
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state[1].description).toBe('Updated');
});

test('should not edit an expense if id is invalid', () => {
    const updates = {
        description: 'Updated',
        note:'',
        amount: 0,
        createdAt: 0
    }
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses', () => {
   const action = {
     type: 'SET_EXPENSES',
     expenses: [expenses[1]]
   }
   const state = expensesReducer(expenses, action);
   expect(state).toEqual([expenses[1]]);
});
