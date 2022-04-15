import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.css';
import Info from './info/Info';
import OrdersPage from './orders/OrdersPage';
import NotFound from "./not-found/NotFound";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/"  element={<OrdersPage />} />
      <Route path="orders" element={<OrdersPage />} />
      <Route path="info" element={<Info  />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);