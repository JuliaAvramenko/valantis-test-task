import { FC } from 'react';
import { TItem } from '../../api/types';
import styles from './card.module.css';


const Card: FC<TItem> = ({ id, product, brand, price }) => {
    return (
        <article className={styles.card}>
            <p className={styles.name}>{id}</p>
            {brand && <p className={styles.name}>{brand}</p>}
            <p className={styles.name}>{product}</p>
            <p className={styles.price}>{`${price} ₽`} </p>

        </article>
    )
}

export default Card;