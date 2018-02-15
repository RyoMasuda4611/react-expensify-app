import React from 'react';
import moment from 'moment';

const defFilters = {
  text: '',
  sortBy: 'date',
  startDate: undefined,
  endDate: undefined
}

const altFilters = {
  text: 'bills',
  sortBy: 'date',
  startDate: moment(0),
  endDate: moment(0).add(3, 'day')
}

export { defFilters, altFilters }
