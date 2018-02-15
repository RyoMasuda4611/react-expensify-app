import React from 'react';
import { shallow } from 'enzyme';
import ExpenseItemList from '../../components/ExpenseItemList';
import expenses from '../fixtures/expenses';

test('should render Expense Item List correctly', () => {
    const wrapper = shallow(<ExpenseItemList {...expenses[0]} />);
    expect(wrapper).toMatchSnapshot();
});
