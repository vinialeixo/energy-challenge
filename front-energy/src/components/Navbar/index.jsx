import React from 'react'
import logo from '../../img/labs_lumi_logo.jpg'
import styles from './styles.module.scss'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div>
                <img src={logo}/>
            </div>
            <div>
                Dashboard
            </div>
        </div>
    )
}

export default Navbar