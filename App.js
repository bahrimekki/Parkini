import React from "react";
import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import Routes from "./src/routers/Routes";
const App = () => {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
};
export default App;
