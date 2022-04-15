import { React } from "react";
import Header from "../commons/Header";
import Footer from "../commons/Footer";
import "./NotFound.css";

function NotFound(props) {
  return (
    <>
      <Header />
      <main id="not-found-main">
        <h1>404 - Not Found</h1>
      </main>
      <Footer />
    </>
  );
}

export default NotFound;
