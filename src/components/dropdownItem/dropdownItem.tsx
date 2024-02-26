import { FC } from 'react';
import styles from './dropdownItem.module.css';


type TProps = {
    item: string,
    callback: (item: string) => void
}


const DropdownItem: FC<TProps> = ({ item, callback }) => {
    return (
        <button className={styles.item} onClick={() => { callback(item) }}>{item}</button>
    )
}

export default DropdownItem