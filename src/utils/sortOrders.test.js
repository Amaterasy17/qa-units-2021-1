import React from 'react'
import {getSortFunction, sortByDate, sortByItemCount, sortOrders, sortTypes} from './sortOrders';

describe('sortByItemCount function', () => {
	test.each([
		[null, null],
		[2, 3],
		[{items: null}, {items: null}]
	])('orders with not valid data', (order1, order2) => {
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(0);
	})

	it('count items in first order is less than in second order', () => {
		const order1 = {
			items: [1, 2, 3, 4]
		}
		const order2 = {
			items: [1, 2, 3, 4, 5]
		}
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(-1);
	});

	it('count items in first order is more than in second order', () => {
		const order1 = {
			items: [1, 2, 3, 4, 5]
		}
		const order2 = {
			items: [1, 2, 3, 4]
		}
		const result = sortByItemCount(order1, order2);
		expect(result).toEqual(1);
	});

	it('same items count', () => {
		const order1 = {
			items: ['item1', 'item2'],
		};

		const order2 = {
			items: ['1', '2'],
		};

		const result = sortByItemCount(order1, order2);

		expect(result).toBe(0);
	});
});

describe('sortByDate function', () => {
	test.each([
		[null, null],
		[2, 3],
		[{date: null}, {date: null}]
	])('orders are not valid', (order1, order2) => {
		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});

	it('data in first order is less than in second', () => {
		const order1 = {
			date: 2
		}
		const order2 = {
			date: 3
		}
		const result = sortByDate(order1, order2);
		expect(result).toEqual(1);
	});


	it('data in first order is more than in second', () => {
		const order1 = {
			date: 5
		}
		const order2 = {
			date: 3
		}
		const result = sortByDate(order1, order2);
		expect(result).toEqual(-1);
	});

	it('data in first order is equal than in second', () => {
		const order1 = {
			date: 3
		}
		const order2 = {
			date: 3
		}
		const result = sortByDate(order1, order2);
		expect(result).toEqual(0);
	});
});

describe('sortOrders function', () => {
	test.each([
		[null, () => {}],
		[[1, 2, 3], null],
	])('not valid case', (orders, sort) => {
		const result = sortOrders(orders, sort);
		expect(result).toBeUndefined()
	});
});

describe('getSortFunction function', () => {
	it('sortType = count', () => {
		const result = getSortFunction(sortTypes.COUNT)
		expect(result).toBe(sortByItemCount)
	});

	it('sortType = date', () => {
		const result = getSortFunction(sortTypes.DATE)
		expect(result).toBe(sortByDate)
	});
});
