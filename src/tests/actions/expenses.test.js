import { addExpense, removeExpense, editExpense } from '../../actions/expenses';

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

 test('should set up add expense action object with some properties', () => {
    const expenseData = {
      description: 'test',
      note: 'now it is testing',
      amount: 1000,
      createdAt: 1000000
    }

    const action = addExpense(expenseData);

    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        ...expenseData,
        id: expect.any(String)
      }
    });
 });

 test('should set up add expense action object with default properties', () => {
    const action = addExpense();
    expect(action).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        description:'',
        note: '',
        amount: 0,
        createdAt: 0 
      }
    });
 });