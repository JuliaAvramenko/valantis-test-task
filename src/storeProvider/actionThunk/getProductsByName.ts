import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TId } from '../../api/types'

export const getProductsByNameAction = createAsyncThunk<TId[], string, ThunkConfig>(
    "get-products-by-name",
    async (name, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.filterProductsByName(name)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)