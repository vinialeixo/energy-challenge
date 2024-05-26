import styles from "./styles.module.scss";

const Title = ({ text, children }) => {

    return (
        <div className={styles.container}>
            {text}
            {children}
        </div>
    )
}

export default Title