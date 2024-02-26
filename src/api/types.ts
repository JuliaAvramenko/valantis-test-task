export type TPagination = {
    offset?: number
    limit?: number
}

export type TResponse<T> = {
    result: Array<T>
}

export type TId = string

export type TItem = {
    brand: null | string
    id: string
    price: number
    product: string
}

export type TField = string | null


export type TGetItemsRequest = {
    ids: TId[]
}

export type TFieldsRequest = {
    field: string
} & TPagination

export type TBrandFilterRequest = {
    brand: string
}


export type TPriceFilterRequest = {
    price: number
}

export type TNameFilterRequest = {
    name: string
}