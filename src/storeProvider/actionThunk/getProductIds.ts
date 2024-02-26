import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TId, TPagination } from '../../api/types'

export const getProductIdsAction = createAsyncThunk<TId[], TPagination, ThunkConfig>(
    "get-product-ids",
    async (pagination, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.getProductIds(pagination)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)