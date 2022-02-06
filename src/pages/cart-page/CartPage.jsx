import React from 'react';
import { Link } from 'react-router-dom';
import { useReactiveVar, useMutation } from '@apollo/client';

import { cart } from '~/gql-client/reactive-variables';
import { CREATE_ORDER } from '~/gql-client/pizza.mutations';

import PizzaCartOrder from '~/components/PizzaCartOrder';

import { transformToOrderedPizzasInput } from '~/utils/pizza.utils';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';
import emptyShoppingCart from '~/icons/empty-shopping-cart.png';

function CartPage() {
  const currentCart = useReactiveVar(cart);

  const totalPrice = React.useMemo(
    () =>
      parseFloat(
        currentCart
          .reduce((acc, item) => acc + item.amount * item.selectedModification.price, 0)
          .toFixed(2),
        10,
      ),
    [currentCart],
  );

  const totalAmount = React.useMemo(
    () => currentCart.reduce((acc, item) => acc + item.amount, 0).toFixed(2),
    [currentCart],
  );

  const [createOrder] = useMutation(CREATE_ORDER, {
    variables: {
      order: {
        totalPrice,
        totalAmount,
        orderedPizzas: [],
      },
    },

    optimisticResponse: {
      createOrder: {
        id: '',
        totalPrice: 0,
        totalAmount: 0,
        orderedPizzas: [],
      },
    },
  });

  function clearCart() {
    cart([]);
    window.localStorage.setItem('cart', JSON.stringify([]));
  }

  const onCreateOrder = React.useCallback(() => {
    createOrder({
      variables: {
        order: {
          totalPrice,
          totalAmount: parseInt(totalAmount, 10),
          orderedPizzas: currentCart.map(transformToOrderedPizzasInput),
        },
      },
    }).then(clearCart);
  }, [totalPrice, totalAmount, currentCart]);

  return (
    <>
      {/* TODO: move header to the shared component */}
      <header className="px-5 pt-14 pb-7 flex justify-between ">
        <Link className="flex" to="/">
          <div className="flex justify-center items-center">
            <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
          </div>

          <div className="flex flex-grow flex-col items-start">
            <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
            <h2 className=" text-lg font-bold text-gray-400">самая реактивная пицца</h2>
          </div>
        </Link>
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
                <PizzaCartOrder
                  key={`${pizzaOrder.id}-${pizzaOrder.selectedModification.id}`}
                  pizzaOrder={pizzaOrder}
                />
              ))}
            </tbody>
          </table>

          <div className="mt-5 flex justify-between">
            <p>
              Всего пицц: <strong>{totalAmount} шт.</strong>
            </p>

            <p>
              Сумма заказа: <strong className="text-yellow-500">{totalPrice} ₽</strong>
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
              onClick={onCreateOrder}
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
    </>
  );
}

export default CartPage;
