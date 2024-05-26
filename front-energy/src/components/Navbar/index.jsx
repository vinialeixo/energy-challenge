import React from 'react'

import styles from './styles.module.scss'

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div>
                Lumi Challenge
            </div>
            <div>
                Invoice Processor
            </div>
        </div>
    )
}

export default Navbar