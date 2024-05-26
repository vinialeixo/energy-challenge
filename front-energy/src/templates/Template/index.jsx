import React from 'react'

import { Navbar, Sidebar, Footer } from "../../components";

import styles from './styles.module.scss'

function Template({ navbar, sidebar, content, footer, children }) {
	return (
        <div className={styles.template}>	
			<div className={styles.navbar}>
				<Navbar />
				{navbar}
			</div>
			<div className={styles.mainContainer}>

				<div className={styles.sidebar} >
					<Sidebar />
					{sidebar}
				</div>

				<div className={styles.mainContent}>
					{children}
					{content}
				</div>
			
			</div>
			<div >
				<div>
					<Footer />
					{footer}
				</div>
			</div>
		
		</div>
	);
}

export default Template;

