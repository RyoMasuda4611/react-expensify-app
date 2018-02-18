import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, 
         addExpense, 
         removeExpense, 
         editExpense, 
         setExpenses, 
         startSetExpenses, 
         startRemoveExpense, 
         startEditExpense
        } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({id, description, amount, note, createdAt }) => {
    expensesData[id] = { description, amount, note, createdAt };
  });
  database.ref('expenses').set(expensesData).then(() => done());
});

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123abc' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123abc'
  });
});

 test('should set up edit expense action object', () => {
   const action = editExpense('123abc', {note: 'test'});
   expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123abc',
    updates: {
      note: 'test'
    }  
   });
 });


test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'mouse',
    amount: 30,
    note: 'I bought',
    createdAt: 1000
  }
  
  store.dispatch(startAddExpense(expenseData)).then(()=> {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    }); //storeされたかの確認
   return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with default to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefault = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  }
  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefault
      }
    }); //storeされたかの確認
   return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});

test('should setup set expense action object with data', () => {
   const action = setExpenses(expenses);
   expect(action).toEqual({
     type: 'SET_EXPENSES',
     expenses
   })
});

test('should fetch the expenses from database', (done) => {
  const store = createMockStore();
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })
});

test('should remove expenses from database', (done) => {
  const store = createMockStore();
  const id = expenses[0].id
  store.dispatch(startRemoveExpense({ id })).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeFalsy();
    done();
  }); 
});

test('should update expense ', (done) => {
  const store = createMockStore();
  const id = expenses[0].id;
  const updates = {
    description: 'update',
    amount: 123,
    note: 'update',
    createdAt: 0
  }
  store.dispatch(startEditExpense(id, updates)).then((ref) => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      id,
      updates
    });
    return database.ref(`expenses/${id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(updates);
  });
  done();
});
