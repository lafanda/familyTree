import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {UserContextProvider} from "./components/registration/Context";
import {BrowserRouter} from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

            <UserContextProvider>
                <App/>
            </UserContextProvider>
    </React.StrictMode>
);

reportWebVitals();
