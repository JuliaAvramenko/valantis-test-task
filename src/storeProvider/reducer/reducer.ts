import { createSlice } from '@reduxjs/toolkit'
import { getProductIdsAction } from '../actionThunk/getProductIds'
import { TInitialStateReducer } from '../types'
import { getProductsAction } from '../actionThunk/getProducts'
import { getFieldsAction } from '../actionThunk/getFields'
import { TField, TItem } from '../../api/types'
import { getProductsByBrandAction } from '../actionThunk/getProductsByBrand'
import { getProductsByPriceAction } from '../actionThunk/getProductsByPrice'
import { getProductsByNameAction } from '../actionThunk/getProductsByName'


const initialState: TInitialStateReducer = {
  isLoading: false,
  productIds: [],
  products: [],
  fields: []
}

function getUniqueProducts(items: Array<TItem>) {
  const result = items.reduce<Array<TItem>>((acc, item) => {
    const searchRes = acc.filter((i) => i.id === item.id)
    if (searchRes.length > 0) {
      return acc
    }
    else {
      return [...acc, item]
    }
  }, []);

  return result
}

function getUniqueValues<T>(items: Array<T>) {
  const result = items.reduce<Array<T>>((acc, item) => {
    const searchRes = acc.filter((i) => i === item)
    if (searchRes.length > 0) {
      return acc
    }
    else {
      return [...acc, item]
    }
  }, []);

  return result
}

export const reducer = createSlice({
  name: "products_data_reducer",
  initialState,
  reducers:
  {
    productsReset: state => {
      state.products = []
    }
  },
  extraReducers: builder => {
    builder
      .addCase(getProductIdsAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProductIdsAction.fulfilled, (state, { payload }) => {
        state.productIds = payload
        state.isLoading = false
      })
      .addCase(getProductIdsAction.rejected, (state, { payload }) => {
        state.isLoading = false
      })

      .addCase(getProductsAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProductsAction.fulfilled, (state, { payload }) => {
        state.products = getUniqueProducts(payload)
        state.isLoading = false
      })
      .addCase(getProductsAction.rejected, (state, { payload }) => {
        state.isLoading = false
      })

      .addCase(getFieldsAction.pending, state => {
      })
      .addCase(getFieldsAction.fulfilled, (state, { payload }) => {
        state.fields = getUniqueValues<TField>(
          payload.filter((item) => item !== null)
        ).sort()
      })
      .addCase(getFieldsAction.rejected, (state, { payload }) => {
      })


      .addCase(getProductsByBrandAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProductsByBrandAction.fulfilled, (state, { payload }) => {
        state.productIds = payload
        state.isLoading = false
      })
      .addCase(getProductsByBrandAction.rejected, (state, { payload }) => {
        state.isLoading = false
      })

      .addCase(getProductsByPriceAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProductsByPriceAction.fulfilled, (state, { payload }) => {

        state.productIds = payload
        state.isLoading = false
      })
      .addCase(getProductsByPriceAction.rejected, (state, { payload }) => {
        state.isLoading = false
      })

      .addCase(getProductsByNameAction.pending, state => {
        state.isLoading = true
      })
      .addCase(getProductsByNameAction.fulfilled, (state, { payload }) => {
        state.productIds = payload
        state.isLoading = false
      })
      .addCase(getProductsByNameAction.rejected, (state, { payload }) => {
        state.isLoading = false
      })
  }
})

export const { actions: productsDataActions, reducer: productsReducer } = reducer

