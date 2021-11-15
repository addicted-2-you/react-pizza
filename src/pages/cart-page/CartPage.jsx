import React from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';

import { cart } from '~/gql-client/reactive-variables';

import PizzaCartOrder from '~/components/PizzaCartOrder';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';
import emptyShoppingCart from '~/icons/empty-shopping-cart.png';

function CartPage() {
  const currentCart = useReactiveVar(cart);

  function clearCart() {
    cart([]);
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  return (
    <div className="p-5 h-screen bg-yellow-200">
      <div className="h-full bg-white rounded-lg">
        {/* TODO: move header to the component */}
        <header className="px-20 pt-14 pb-7 flex justify-between ">
          <div className="flex justify-center items-center">
            <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
          </div>

          <div className="flex flex-grow flex-col items-start">
            <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
            <h2 className=" text-lg font-bold text-gray-400">самая реактивная пицца</h2>
          </div>
        </header>

        <hr className="m-auto w-11/12" />

        {currentCart.length ? (
          <div className="mt-16 mx-auto w-2/3">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Корзина</h2>

              <button
                className="text-gray-400 cursor-pointer hover:underline"
                type="button"
                onClick={clearCart}
              >
                Очистить корзину
              </button>
            </div>

            <hr className="mt-7" />

            <table className="mt-7 w-full">
              <tbody>
                {currentCart.map((pizzaOrder) => (
                  <PizzaCartOrder key={pizzaOrder.id} pizzaOrder={pizzaOrder} />
                ))}
              </tbody>
            </table>

            <div className="mt-5 flex justify-between">
              <p>
                Всего пицц:{' '}
                <strong>{currentCart.reduce((acc, item) => acc + item.count, 0)} шт.</strong>
              </p>

              <p>
                Сумма заказа:{' '}
                <strong className="text-yellow-500">
                  {currentCart
                    .reduce((acc, item) => acc + item.count * item.selectedModification.price, 0)
                    .toFixed(2)}{' '}
                  ₽
                </strong>
              </p>
            </div>

            <div className="mt-10 flex justify-between items-center">
              <Link
                className="py-2 px-5 text-gray-400 rounded-3xl border-2 border-gray-400 cursor-pointer hover:underline"
                to="/"
              >
                &lt; Вернуться назад
              </Link>

              <button
                className="py-2 px-5 text-yellow-500 rounded-3xl bg-white border-2 border-yellow-500 cursor-pointer hover:text-white hover:bg-yellow-500"
                type="button"
              >
                Оплатить сейчас
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <h2 className="mt-32 text-2xl text-center font-semibold">Корзина пустая 😕</h2>
            <p className="mt-3 text-center text-gray-500">
              Вероятней всего, вы не заказывали ещё пиццу.
            </p>

            <p className="text-center text-gray-500">
              Для того, чтобы заказать пиццу, перейди на главную страницу.
            </p>

            <img className="mt-11" src={emptyShoppingCart} alt="empty shopping cart" />

            <Link
              className="mt-10 py-2 px-8 bg-gray-800 text-white cursor-pointer rounded-3xl hover:underline"
              to="/"
            >
              &lt; Вернуться назад
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
