import { React, useEffect, useState } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";
import Orders from "./Orders";
import OrdersTable from "./OrdersTable";
import getObjects from "../utils/http-requester";

function OrdersPage(props) {
  let [objects, setObjects] = useState({ orders: false, sellers: false });

  useEffect(() => {
    async function fetchData() {
      await getObjects(setObjects);
    };
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main>
        <h1>Orders</h1>
        <Orders orders={objects.orders} sellers={objects.sellers} />
        <OrdersTable orders={objects.orders} sellers={objects.sellers} />
      </main>
      <Footer />
    </>
  );
}

export default OrdersPage;
