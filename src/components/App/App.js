import React from "react";
import { Helmet } from "react-helmet";
import "./App.module.scss";

const App = () => (
  <div className="App">
    <Helmet>
      <meta charSet="utf-8" />
      <title>My Weather</title>
    </Helmet>
    <h1>Hello World</h1>
  </div>
);

export default App;
