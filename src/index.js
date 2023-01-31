import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import store from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cabinet from './components/cabinet/Cabinet';
import SendTransaction from './components/cabinet/SendTransaction';
import Login from './components/auth/Login';
import Registration from './components/auth/Registration';
import WelcomePage from './components/WelcomePage';
import RequireAuth from './utils/requireAuth';

const root = createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <WelcomePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/cabinet' element={<RequireAuth> <Cabinet /> </RequireAuth>} />
                    <Route path='/send-transaction' element={<RequireAuth> <SendTransaction /> </RequireAuth>} />
                </Routes>
            </BrowserRouter>
                
        </Provider>
    </React.StrictMode>
  );
