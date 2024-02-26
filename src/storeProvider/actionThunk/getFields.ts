import { createAsyncThunk } from '@reduxjs/toolkit'
import { ThunkConfig } from '../types'
import { Api } from '../../api/api'
import { TField, TFieldsRequest } from '../../api/types'

export const getFieldsAction = createAsyncThunk<TField[], TFieldsRequest, ThunkConfig>(
    "get-fields",
    async (fields, thunkAPI) => {
        const { rejectWithValue } = thunkAPI
        try {
            const data = await Api.getProductFields(fields)

            return data.result
        } catch (error) {
            return rejectWithValue(error)
        }
    }
)