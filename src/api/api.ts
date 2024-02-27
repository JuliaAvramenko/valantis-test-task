import { TField, TFieldsRequest, TGetItemsRequest, TId, TItem, TPagination, TResponse } from "./types";
import { MD5 } from "crypto-js";

const fetch = require('fetch-retry')(global.fetch)

function currentDate() {
    const year = new Date().getUTCFullYear()
    const month = new Date().getUTCMonth() + 1
    const date = new Date().getUTCDate()
    let sMonth = `${month}`
    if (month < 10) {
        sMonth = "0" + sMonth
    }

    let sDate = `${date}`
    if (date < 10) {
        sDate = "0" + sDate
    }

    return `${year}${sMonth}${sDate}`
}

export const config = {
    baseUrl: "http://api.valantis.store:40000/",
    headers: {
        'X-Auth': MD5(`${"Valantis_"}${currentDate()}`).toString(),
        'Content-Type': 'application/json',
    },
}

export const Api = (function (config) {

    function checkResponse(response: any): Promise<TResponse<any>> {
        if (response.ok) {
            return response.json()
        }

        return Promise.reject(`Что-то пошло не так: ${response.status}`)
    }

    async function makeRequest(body: any): Promise<TResponse<any>> {

        const response = await fetch(`${config.baseUrl}`, {
            method: "POST",
            headers: config.headers,
            body: JSON.stringify(body),
            retryOn: async function (attempt: any, error: any, response: any) {
                if (response.status >= 500) {
                    const textError = await response.text()
                    console.log(textError);
                    return true;
                }
            }
        })

        const data = checkResponse(response);
        return data as Promise<any>
    }


    async function getProductFields(fields: TFieldsRequest): Promise<TResponse<TField>> {
        return makeRequest({
            "action": "get_fields",
            "params": fields
        })
    }


    async function getProductItems(ids: TGetItemsRequest): Promise<TResponse<TItem>> {
        return makeRequest({
            "action": "get_items",
            "params": ids
        })
    }

    async function getProductIds(pagination: TPagination): Promise<TResponse<TId>> {
        return makeRequest({
            "action": "get_ids",
            "params": pagination
        })
    }

    async function filterProductsByBrand(brand: string): Promise<TResponse<TId>> {
        return makeRequest({
            "action": "filter",
            "params": {
                "brand": brand
            }
        })
    }

    async function filterProductsByPrice(price: number): Promise<TResponse<TId>> {
        return makeRequest({
            "action": "filter",
            "params": {
                "price": Number(price)
            }
        })
    }

    async function filterProductsByName(name: string): Promise<TResponse<TId>> {
        return makeRequest({
            "action": "filter",
            "params": {
                "product": name
            }
        })
    }

    return {
        getProductIds,
        getProductItems,
        getProductFields,
        filterProductsByBrand,
        filterProductsByPrice,
        filterProductsByName
    }



}(config))
