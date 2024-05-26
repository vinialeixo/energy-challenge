import React from 'react'
import {
    Routes,
    Route,
} from "react-router-dom";

import { paths } from "./Paths";
import Dashboard from "./pages/Dashboard";

const getRoutes = (links) => {
    return links.map((link, idx) => {
        return (
            <Route key={idx} path={link.path} element={link.element} />
        )
    })
}

const SystemRoutes = () => {
    return (  
        <Routes >
            <Route path='/' >
                <Route index element={<Dashboard />} />
                {getRoutes(paths)}
            </Route>
        </Routes>
    )
}

export default SystemRoutes;