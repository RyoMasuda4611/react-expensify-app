import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { defFilters, altFilters } from '../fixtures/filters';
import expenses from '../fixtures/expenses';

let setStartDate, setEndDate, setTextFilter, sortByDate, sortByAmount, wrapper

beforeEach(() => {
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  setTextFilter = jest.fn();
  sortByAmount = jest.fn();
  sortByDate = jest.fn();
  wrapper = shallow(<ExpenseListFilters 
                      filters={defFilters}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      setTextFilter={setTextFilter}
                      sortByAmount={sortByAmount}
                      sortByDate={sortByDate}
                      />
                    );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters correctly', () => {
  wrapper.setProps({
      filters: altFilters
  });
  expect(wrapper).toMatchSnapshot();
});

test('should handle text chnage', () => {
    const value = 'setText';
    wrapper.find('input').simulate('change', { target: { value }});
    expect(setTextFilter).toHaveBeenLastCalledWith(value);
});

test('should sort by date', () => {
    const value = 'date';
    wrapper.setProps({
        filters: altFilters
    });
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByDate).toHaveBeenCalled();
});

test('should sort by amount', () => {
    const value = 'amount';
    wrapper.find('select').simulate('change', { target: { value }});
    expect(sortByAmount).toHaveBeenCalled();
});

test('should handle date change', () => {
    const startDate = moment(0);
    const endDate = moment(0).add(3,'day');
    wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({ startDate, endDate });
    expect(setStartDate).toHaveBeenCalledWith(startDate);
    expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test('should handle date focus change', () => {
    const calendarFocused = 'endDate';
    wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(calendarFocused);
    expect(wrapper.state('calendarFocused')).toBe('endDate');
});
