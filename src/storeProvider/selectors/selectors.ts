import { StateSchema } from "../types"
export const getProductIdsSelector = (state: StateSchema) => {
    return state.products.productIds
}

export const getProductsSelector = (state: StateSchema) => {
    return state.products.products
}

export const getFieldsSelector = (state: StateSchema) => {
    return state.products.fields
}

export const statusLoadingSelector = (state: StateSchema) => {
    return state.products.isLoading
}