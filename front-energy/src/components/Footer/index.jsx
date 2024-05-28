import React from 'react'
import footer from '../../img/labs_lumi_cover.jpg'
import styles from "./styles.module.scss";

const Footer = () => {
    return (
        // <div className={styles.container}>
        // </div>
            <img style={{maxWidth:"100%"}} src={footer}/>
    )
}

export default Footer