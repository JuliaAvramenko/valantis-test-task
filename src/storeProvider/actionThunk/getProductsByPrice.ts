import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TId } from '../../api/types'

export const getProductsByPriceAction = createAsyncThunk<TId[], number, ThunkConfig>(
    "get-products-by-price",
    async (price, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.filterProductsByPrice(price)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)