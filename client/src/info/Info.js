import { React } from "react";
import Footer from "../commons/Footer";
import Header from "../commons/Header";

function Info(props) {
  return (
    <>
      <Header />
      <main>
        <h1>Info</h1>
        <br />
        <h2>Gabriel Pachêco Milhomem</h2>
        <p>This mini-project was created by using:</p>
        <ul>
          <li>React</li>
          <li>React Route</li>
          <li>Node</li>
          <li>Express</li>
        </ul>
      </main>
      <Footer />
    </>
  );
}

export default Info;
