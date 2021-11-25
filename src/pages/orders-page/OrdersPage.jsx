import React from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { orderBy } from '~/gql-client/reactive-variables';

import OrdersGrid from './OrdersGrid';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';

function OrdersPage() {
  const currentOrderBy = useReactiveVar(orderBy);

  function onOrderBySelectChange({ target: { value } }) {
    orderBy(value);
  }

  return (
    <div className="p-5 min-h-screen bg-yellow-200">
      <div className="h-full bg-white rounded-lg">
        <header className="px-20 pt-14 pb-7 flex justify-between items-center">
          <div className="flex justify-center items-center">
            <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
          </div>

          <div className="flex flex-grow flex-col items-start">
            <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
            <h2 className=" text-lg font-bold text-gray-400">самая вкусная пицца во вселенной</h2>
          </div>

          <Link
            className="py-1 px-6 bg-yellow-500 rounded-2xl text-white font-semibold border-none cursor-pointer hover:underline"
            to="/cart"
          >
            Корзина
          </Link>
        </header>

        <hr className="m-auto w-11/12" />

        <div className="flex justify-between">
          <label htmlFor="order-by-select">
            <span>Сортировка по: </span>

            <select
              className="text-yellow-600 font-semibold underline"
              id="order-by-select"
              value={currentOrderBy}
              onChange={onOrderBySelectChange}
            >
              <option className="text-black" value="popularity">
                полулярности
              </option>
              <option className="text-black" value="price">
                цене
              </option>
              <option className="text-black" value="alphabet">
                алфавиту
              </option>
            </select>
          </label>
        </div>

        <div className="p-2">
          <OrdersGrid />
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
