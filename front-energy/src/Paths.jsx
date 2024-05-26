import React from "react";

import Dashboard from "./pages/Dashboard"
import Invoices from './pages/Invoices';

export const paths = [
    { path: '/dashboard', element: <Dashboard />, label: 'Dashboard' },
    { path: '/invoices', element: <Invoices />, label: 'Faturas' },
]