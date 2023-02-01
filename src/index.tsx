import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { store } from './store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Cabinet from './pages/cabinet/cabinet.form';
import SendTransaction from './pages/send-transaction/send-transaction.form';
import Login from './pages/login/login.form';
import Registration from './pages/registration/registration.form';
import WelcomePage from './pages/welcome-page.form';
import RequireAuth from './utils/requireAuth';

const root = createRoot(document.getElementById("root")!);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={ <WelcomePage />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/registration' element={<Registration />} />
                    <Route path='/cabinet' element={<RequireAuth><Cabinet /></RequireAuth>} />
                    <Route path='/send-transaction' element={<RequireAuth><SendTransaction /></RequireAuth>} />
                </Routes>
            </BrowserRouter>
                
        </Provider>
    </React.StrictMode>
  );
