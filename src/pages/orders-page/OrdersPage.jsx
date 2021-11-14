import React from 'react';

// icons
import reactPizzaLogo from '~/icons/react-pizza-logo.png';

import OrdersGrid from './OrdersGrid';

function OrdersPage() {
  return (
    <div className="p-5 min-h-screen bg-yellow-200">
      <div className="h-full bg-white rounded-lg">
        <header className="px-20 pt-14 pb-7 flex justify-between ">
          <div className="flex justify-center items-center">
            <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
          </div>

          <div className="flex flex-grow flex-col items-start">
            <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
            <h2 className=" text-lg font-bold text-gray-400">самая вкусная пицца во вселенной</h2>
          </div>
        </header>

        <hr className="m-auto w-11/12" />

        <div className="p-2">
          <OrdersGrid />
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;