import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TGetItemsRequest, TItem } from '../../api/types'

export const getProductsAction = createAsyncThunk<TItem[], TGetItemsRequest, ThunkConfig>(
    "get-products",
    async (items, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.getProductItems(items)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)