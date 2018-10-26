import React from "react";
import { render } from "react-dom";
import App from "./app";
if (process.env.NODE_ENV === "development") require("./mock");

render(<App />, document.getElementById("root"));
