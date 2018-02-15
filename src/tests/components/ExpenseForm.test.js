import React from 'react';
import { shallow } from 'enzyme';
import ExpenseForm from '../../components/ExpenseForm';
import expenses from '../fixtures/expenses';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';

test('should render Expense From correctly', () => {
  const wrapper = shallow(<ExpenseForm />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Expense Form with expense data', () => {
    const wrapper = shallow(<ExpenseForm expense={ expenses[1] } />);
    expect(wrapper).toMatchSnapshot();
});

test('should render error for invalid form submission', () => {
    const wrapper = shallow(<ExpenseForm />); 
    expect(wrapper).toMatchSnapshot();
    wrapper.find('form').simulate('submit', {
        preventDefault: () => {}
    });
    expect(wrapper.state('error').length).toBeGreaterThan(0);
    expect(wrapper).toMatchSnapshot(); 
});

test('should set description on input change', () => {
  const value = 'New description';
  const wrapper = shallow(<ExpenseForm />); 
  wrapper.find('input').at(0).simulate ('change', { target: { value } });
  expect(wrapper.state('description')).toBe(value);
});

test('should set note on text area change', () => {
   const value = 'New note';
   const wrapper = shallow(<ExpenseForm />);   
   wrapper.find('textarea').simulate ('change', { target: { value } });
   expect(wrapper.state('note')).toBe(value)
});

test('should set amount on input change', () => {
   const value = '123.45';
   const wrapper = shallow(<ExpenseForm />); 
   wrapper.find('input').at(1).simulate('change', { target: { value } });
   expect(wrapper.state('amount')).toBe(value);
});

test('should not set amount if value is invalid', () => {
    const value = '123.456';
    const wrapper = shallow(<ExpenseForm />); 
    wrapper.find('input').at(1).simulate('change', { target: { value } });
    expect(wrapper.state('amount')).toBeFalsy();
 });

test('should call onSubmit prop for valid form submission', () => {
    const onSubmitspy = jest.fn();
    const wrapper = shallow(<ExpenseForm  expense={ expenses[0] } onSubmit={ onSubmitspy } />);
    wrapper.find('form').simulate('submit', { preventDefault: ()=>{} });
    
    expect(wrapper.state('error')).toBe('');
    expect(onSubmitspy).toHaveBeenLastCalledWith({
        description: expenses[0].description,
        note: expenses[0].note,
        amount: expenses[0].amount,
        createdAt: expenses[0].createdAt
    });
});

test('should set new data change', () => {
    const now = moment();
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onDateChange')(now);
    expect(wrapper.state('createdAt')).toEqual(now);    
});

test('should set calendar focus on change', () => {
    const focused = true;
    const wrapper = shallow(<ExpenseForm />);
    wrapper.find('withStyles(SingleDatePicker)').prop('onFocusChange')({ focused });
    expect(wrapper.state('calendarFocused')).toBe(focused);
});
