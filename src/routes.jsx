import React from 'react';

// pages
import OrdersPage from './pages/orders-page/OrdersPage';
import CartPage from './pages/cart-page/CartPage';
import AdminOrdersPage from './pages/admin-orders-page/AdminOrdersPage';

// components
import PageContainer from './components/PageContainer';

export default [
  {
    path: '/',
    element: (
      <PageContainer>
        <OrdersPage />
      </PageContainer>
    ),
  },

  {
    path: '/cart',
    element: (
      <PageContainer>
        <CartPage />
      </PageContainer>
    ),
  },

  {
    path: '/admin-orders',
    element: (
      <PageContainer>
        <AdminOrdersPage />
      </PageContainer>
    ),
  },
];
