import React from 'react';

import reactPizzaLogo from '~/icons/react-pizza-logo.png';
// import shoppingCartIcon from '~/icons/shopping-cart-icon.png';

function App() {
  return (
    <div className="min-h-screen">
      <header className="px-20 pt-14 pb-7 flex justify-between">
        <div className="flex justify-center items-center">
          <img className="mr-4 row-span-2" src={reactPizzaLogo} alt="react pizza logo" />
        </div>

        <div className="flex flex-grow flex-col items-start">
          <h1 className="text-2xl font-bold uppercase">React Pizza</h1>
          <h2 className=" text-lg font-bold text-gray-400">самая вкусная пицца во вселенной</h2>
        </div>
      </header>

      <hr className="m-auto w-11/12" />
    </div>
  );
}

export default App;
