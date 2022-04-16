import { React } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";
import Orders from "./Orders";
import OrdersTable from "./OrdersTable";

function OrdersPage(props) {
  return (
    <>
      <Header />
      <main>
        <h1>Orders</h1>
        <Orders />
        <OrdersTable />
      </main>
      <Footer />
    </>
  );
}

export default OrdersPage;
