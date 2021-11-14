import React from 'react';

import OrdersPage from './pages/orders-page/OrdersPage';
import CartPage from './pages/cart-page/CartPage';

export default [
  { path: '/', element: <OrdersPage /> },
  { path: '/cart', element: <CartPage /> },
];
