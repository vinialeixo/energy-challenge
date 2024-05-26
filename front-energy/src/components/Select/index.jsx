import styles from "./styles.module.scss";

const Select = ({ onChange, items, label, itemValueProperty, itemLabelProperty }) => {

    return (

        <div className={styles.container}>
            {label && 
                <label>{label}</label>
            }
            <select 
                onChange={
                    (e) => {onChange(e.target.selectedOptions[0].value)}
                }
            >
                {items && items.map((item, idx) => (
                    <option key={idx} value={item[itemValueProperty]}>
                        {item[itemLabelProperty]}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default Select