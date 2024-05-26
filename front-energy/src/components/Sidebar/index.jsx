import React, { useState } from 'react'
import { Link, useLocation } from "react-router-dom";

import { paths } from "../../Paths";

import styles from './styles.module.scss'

const Sidebar = () => {
    const location = useLocation()
    const [activeLink, setActiveLink] = useState(location.pathname)

    return (
        <div className={`${styles.container} `} >
            <div>
                {paths.map((paths, idx) => {
                    return (
                        <div
                            className={`${styles.navLink}`} 
                            onClick={() => setActiveLink(paths.path)}
                            style={
                                activeLink === paths.path ? 
                                    {borderBottom: '2px solid'} : {}
                            }
                            key={idx}
                        >
                            <Link to={`${paths.path}`}>
                                {paths.label}
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    
    )
}

export default Sidebar