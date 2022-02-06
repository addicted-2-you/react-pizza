import React from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { cart, orderBy, pizzasFilterType } from '~/gql-client/reactive-variables';

import OrdersGrid from './OrdersGrid';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';
import shoppingCartIcon from '~/icons/shopping-cart-icon.svg';

function OrdersPage() {
  const currentCart = useReactiveVar(cart);
  const currentOrderBy = useReactiveVar(orderBy);
  const currentPizzasFilterType = useReactiveVar(pizzasFilterType);

  const totalCartPrice = React.useMemo(
    () =>
      currentCart
        .reduce((acc, item) => acc + item.amount * item.selectedModification.price, 0)
        .toFixed(2),

    [currentCart],
  );

  const totalPizzasAmount = React.useMemo(
    () => currentCart.reduce((acc, item) => acc + item.amount, 0),

    [currentCart],
  );

  function onPizzaTypeFilterChange({ target: { value } }) {
    if (value) {
      pizzasFilterType(value);
    }
  }

  function onOrderBySelectChange({ target: { value } }) {
    orderBy(value);
  }

  return (
    <>
      <header className="px-20 pt-14 pb-7 flex justify-between items-center">
        <Link className="flex" to="/">
          <div className="flex justify-center items-center">
            <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
          </div>

          <div className="flex flex-grow flex-col items-start">
            <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
            <h2 className=" text-lg font-bold text-gray-400">самая вкусная пицца во вселенной</h2>
          </div>
        </Link>

        <Link
          className="py-1 px-3 flex items-center text-white font-semibold  bg-yellow-500 rounded-2xl border-none cursor-pointer hover:underline"
          to="/cart"
        >
          <span>{totalCartPrice}</span>

          <span className="ml-1">₽</span>

          <span className="mx-2">|</span>

          <img className="mr-1" height="14" src={shoppingCartIcon} alt="shopping cart" />

          <span>{totalPizzasAmount}</span>
        </Link>
      </header>

      <hr className="m-auto w-11/12" />

      <div className="mt-4 px-5 flex justify-between">
        <div className="space-x-2" onClick={onPizzaTypeFilterChange}>
          <label htmlFor="pizza-type-all">
            <span
              className={`${
                currentPizzasFilterType === 'all'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Все
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-all"
              value="all"
              radioGroup="pizza-type-filter"
            />
          </label>

          <label htmlFor="pizza-type-meat">
            <span
              className={`${
                currentPizzasFilterType === 'meat'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Мясные
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-meat"
              value="meat"
              radioGroup="pizza-type-filter"
            />
          </label>

          <label htmlFor="pizza-type-vegetarian">
            <span
              className={`${
                currentPizzasFilterType === 'vegetarian'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Вегетарианские
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-vegetarian"
              value="vegetarian"
              radioGroup="pizza-type-filter"
            />
          </label>

          <label htmlFor="pizza-type-gril">
            <span
              className={`${
                currentPizzasFilterType === 'gril'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Гриль
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-gril"
              value="gril"
              radioGroup="pizza-type-filter"
            />
          </label>

          <label htmlFor="pizza-type-spicy">
            <span
              className={`${
                currentPizzasFilterType === 'spicy'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Острые
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-spicy"
              value="spicy"
              radioGroup="pizza-type-filter"
            />
          </label>

          <label htmlFor="pizza-type-covered">
            <span
              className={`${
                currentPizzasFilterType === 'covered'
                  ? 'text-white bg-gray-800 hover:bg-gray-700'
                  : 'bg-gray-200 hover:bg-gray-300'
              } py-1 px-4 cursor-pointer rounded-xl`}
            >
              Закрытые
            </span>

            <input
              className="hidden"
              type="radio"
              id="pizza-type-covered"
              value="covered"
              radioGroup="pizza-type-filter"
            />
          </label>
        </div>

        <div>
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
      </div>

      <div className="p-2">
        <OrdersGrid />
      </div>
    </>
  );
}

export default OrdersPage;
