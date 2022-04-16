import { React } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";
import Orders from "./Orders";

function OrdersPage(props) {
  return (
    <>
      <Header />
      <main>
        <h1>Orders</h1>
        <br />
        <Orders />
      </main>
      <Footer />
    </>
  );
}

export default OrdersPage;
