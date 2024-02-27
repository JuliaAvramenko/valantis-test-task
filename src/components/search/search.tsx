import { FC, useCallback, useEffect, useState } from 'react';
import styles from './search.module.css';

type TProps = {
    type?: "price" | "general"
    value: any
    callback: (value: any) => void
}

const Search: FC<TProps> = ({ type = "general", value, callback }) => {

    const [localValue, setLocalValue] = useState("")

    useEffect(() => {
        setLocalValue(value && value || "")

    }, [value])

    const onSubmit = useCallback((e: any) => {
        e.preventDefault()

        const form = e.target

        callback(form.search.value)

    }, [])

    function onChange(e: any) {
        setLocalValue(e.target.value)
    }

    return (
        <form className={styles.form} onSubmit={onSubmit}>
            <input type="text" placeholder={type === "general" && "Поиск" || "Введите цену"} name='search' onChange={onChange} value={localValue} className={styles.input}></input>
            <button type="submit" className={styles.button}>Искать</button>
        </form>
    )
}

export default Search;