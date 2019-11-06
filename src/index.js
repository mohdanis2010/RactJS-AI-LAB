import React from "react";
import ReactDOM from "react-dom";
import { Navbar } from "./containers/navbar";
import { Chart } from "./containers/chartContainer";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { chartApp } from "./model/reducers";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

import "./styles.css";

const alertOptions = {
  position: "bottom center",
  timeout: 5000,
  offset: "30px",
  transition: "scale"
};

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Chart />
      </div>
    );
  }
}

const store = createStore(chartApp);

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...alertOptions}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
