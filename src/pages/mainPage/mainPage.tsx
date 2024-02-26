import React, { useCallback, useEffect, useState } from 'react'
import { Api } from '../../api/api'
import styles from './mainPage.module.css';
import Card from '../../components/card/card';
import { useAppDispatch } from '../../storeProvider/hooks/appDispatch';
import { getProductIdsAction } from '../../storeProvider/actionThunk/getProductIds';
import { getFieldsSelector, getProductIdsSelector, getProductsSelector, statusLoadingSelector } from '../../storeProvider/selectors/selectors';
import { useSelector } from 'react-redux';
import { getProductsAction } from '../../storeProvider/actionThunk/getProducts';
import { TItem } from '../../api/types';

import { ReactComponent as Arrow } from "../../images/Arrow.svg"
import Search from '../../components/search/search';
import { getFieldsAction } from '../../storeProvider/actionThunk/getFields';
import Dropdown from '../../components/dropdown/dropdown';
import { getProductsByBrandAction } from '../../storeProvider/actionThunk/getProductsByBrand';
import { getProductsByPriceAction } from '../../storeProvider/actionThunk/getProductsByPrice';
import { getProductsByNameAction } from '../../storeProvider/actionThunk/getProductsByName';
import { productsDataActions } from '../../storeProvider/reducer/reducer';

const MainPage = () => {
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null)
    const [selectedPrice, setSelectedPrice] = useState<number | null>(null)
    const [selectedName, setSelectedName] = useState<string | null>(null)
    const limit = 50

    const dispatch = useAppDispatch()
    const productIds = useSelector(getProductIdsSelector)
    const products = useSelector(getProductsSelector)
    const fields = useSelector(getFieldsSelector)
    const isLoaded = !useSelector(statusLoadingSelector)

    useEffect(() => {
        if (selectedBrand === null && selectedPrice === null && selectedName === null) {
            dispatch(getProductIdsAction({
                offset: (currentPage - 1) * limit,
                limit: limit
            }))
        }
    }, [currentPage, selectedBrand, selectedPrice, selectedName])

    useEffect(() => {
        if (productIds.length > 0) {
            dispatch(getProductsAction({
                ids: productIds
            }))
        }
        else {
            dispatch(productsDataActions.productsReset())
        }
    }, [productIds])


    useEffect(() => {
        dispatch(getFieldsAction({
            field: "brand"
        }))
    }, [])


    useEffect(() => {
        if (selectedBrand) {
            dispatch(getProductsByBrandAction(selectedBrand))
        }
    }, [selectedBrand])

    useEffect(() => {
        if (selectedPrice) {
            dispatch(getProductsByPriceAction(selectedPrice))
        }
    }, [selectedPrice])

    useEffect(() => {
        if (selectedName) {
            dispatch(getProductsByNameAction(selectedName))
        }
    }, [selectedName])

    function chooseByBrand(brand: string) {
        setSelectedBrand(brand)
        setSelectedPrice(null)
        setSelectedName(null)
    }

    function changePageForward(e: any) {
        if (products.length > 0) {
            setCurrentPage(currentPage + 1)
        }
    }

    function changePageBackward(e: any) {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1)
        }
    }

    function cleanFilter() {
        console.log("cleanFilter")
        setSelectedBrand(null)
        setSelectedPrice(null)
        setSelectedName(null)
        setCurrentPage(1)
    }

    function searchByPrice(value: number) {
        console.log("price", value)
        setSelectedPrice(value)
        setSelectedBrand(null)
        setSelectedName(null)


    }
    function searchByName(value: string) {
        console.log("name", value)
        setSelectedName(value)
        setSelectedBrand(null)
        setSelectedPrice(null)

    }


    return (
        <main className={styles.main}>
            <section className={styles.wrapper}>
                <Dropdown items={fields} callback={chooseByBrand} />
                <button className={styles.clean} onClick={cleanFilter}>Очистить фильтр</button>
                <Search value={selectedPrice} callback={searchByPrice} type="price"></Search>
                <Search value={selectedName} callback={searchByName}></Search>
            </section>
            <section className={styles.container}>
                {
                    !(selectedBrand || selectedName || selectedPrice) && <div className={styles.buttons}>
                        <button className={styles.button} onClick={changePageBackward}>
                            <Arrow className={styles.icon}></Arrow>
                        </button>
                        <p className={styles.number}>{currentPage}</p>
                        <button className={styles.button} onClick={changePageForward}>
                            <Arrow></Arrow>
                        </button>
                    </div>
                }

                <div className={styles.cards}>
                    {
                        isLoaded
                        && (
                            products.length > 0
                            && products.map((item) => <Card key={item.id} {...item} />)
                            || <p>Продукты по фильтру не найдены</p>
                        )
                        || <p>Данные загружаются, подождите немного</p>
                    }
                </div>
            </section>

        </main>
    )
}

export default MainPage