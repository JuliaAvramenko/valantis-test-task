import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TBrandFilterRequest, TId } from '../../api/types'

export const getProductsByBrandAction = createAsyncThunk<TId[], string, ThunkConfig>(
    "get-products-by-brand",
    async (brand, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.filterProductsByBrand(brand)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)