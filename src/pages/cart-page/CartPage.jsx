import React from 'react';
import { useReactiveVar } from '@apollo/client';

import { cart } from '~/gql-client/reactive-variables';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';
import emptyShoppingCart from '~/icons/empty-shopping-cart.png';

function CartPage() {
  const currentCart = useReactiveVar(cart);

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

              <button className="text-gray-400 cursor-pointer hover:underline" type="button">
                Очистить корзину
              </button>
            </div>

            <hr className="mt-7" />

            <div className="mt-7"></div>

            <div className="mt-10 flex justify-between items-center">
              <button
                className="py-2 px-5 text-gray-400 rounded-3xl border-2 border-gray-400 cursor-pointer hover:underline"
                type="button"
              >
                &lt; Вернуться назад
              </button>

              <button
                className="py-2 px-5 text-white rounded-3xl bg-yellow-500 border-2 border-yellow-500 cursor-pointer hover:text-yellow-500 hover:bg-white"
                type="button"
              >
                Оплатить
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

            <button
              className="mt-10 py-2 px-8 bg-gray-800 text-white cursor-pointer rounded-3xl hover:underline"
              type="button"
            >
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartPage;
