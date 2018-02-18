import ExpensesTotalTest from '../../selectors/expenses_total';
import expenses from '../fixtures/expenses';

test('should return 0 if no expense', () => {
    const sum = ExpensesTotalTest([]);
    expect(sum).toBe(0);
});

test('should return amount when 1 expense', () => {
    const sum = ExpensesTotalTest([expenses[0]]);
    expect(sum).toBe(10);
});

test('should sum up amount of multiple expenses', () => {
    const sum = ExpensesTotalTest(expenses);
    expect(sum).toBe(1001010);
});
