import React from 'react';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import {Provider} from "react-redux";
import {store} from "./app/store";
import {BrowserRouter} from "react-router-dom";
import App from "./app/App";

const container  = document.getElementById('root') as HTMLElement
const root = createRoot(container);
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

serviceWorker.unregister();
