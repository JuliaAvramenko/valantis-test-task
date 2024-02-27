import { FC } from 'react';
import styles from './dropdown.module.css';
import DropdownItem from '../dropdownItem/dropdownItem';


type TProps = {
    items: any[],
    callback: (item: string) => void
}

const Dropdown: FC<TProps> = ({ items, callback }) => {
    return (
        <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Бренды</button>
            <div className={styles.dropdown_content}>
                <div className={styles.wrapper}>
                    {items && items.map((item, index) =>
                        <DropdownItem key={index} item={item} callback={callback} />
                    )}
                </div>

            </div>
        </div>
    )
}

export default Dropdown