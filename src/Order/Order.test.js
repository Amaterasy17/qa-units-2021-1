import React from 'react'
import Order from "./Order";
import {fakeOrders} from "../data/fakeOrders";

import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

jest.mock('../utils/getDate');
import {getDate} from '../utils/getDate';
import App from "../App/App";

describe('Order.js', () => {
  beforeEach(() => {
    getDate.mockReturnValue('16.02.2001');
  })

  afterAll(() => {
    jest.resetModules();
  })

  it('getItems items empty massive', () => {
    const props = {
      order: []
    }
    const order = new Order(props);
    const result = order.getItems()
    expect(result).toBeNull()
  });


  it('test render', () => {
    const props = {
      order: fakeOrders[0]
    }
    const wrapper = shallow(<Order {...props}/>);

    expect(wrapper).toMatchSnapshot();
  });

  it('test render with null', () => {
    const props = {
      order: null
    }
    const order = new Order(props);
    // const result = shallow(<Order {...props}/>);
    expect(order.render()).toBeNull();
  });

  it('test render with null fields in order', () => {
    const props = {
      order: {
        shop: null,
        date: null,
      }
    }
    const order = new Order(props);
    const result = order.render()
    expect(result).toBeNull();
  });

  it('using mock called', () => {
    const data = {
      order: fakeOrders[0],
    };

    (new Order(data)).render();

    expect(getDate).toHaveBeenCalledTimes(2);
  });
});

