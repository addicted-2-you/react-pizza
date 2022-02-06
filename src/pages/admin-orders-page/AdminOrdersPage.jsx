import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import { GET_ALL_ORDERS } from '~/gql-client/orders.queries';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';

function AdminOrdersPage() {
  const { data, loading } = useQuery(GET_ALL_ORDERS);

  if (loading) {
    return 'Loading...';
  }

  const { orders = [] } = data;

  return (
    <div>
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

      <ul className="mt-5 px-5">
        {orders.map((order) => (
          <li key={order.id} className="flex justify-between">
            <strong>{order.id}</strong>
            <span>{order.totalPrice} ₽</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminOrdersPage;
