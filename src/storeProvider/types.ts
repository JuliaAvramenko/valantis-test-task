import { TField, TId, TItem } from "../api/types"


export interface StateSchema {
  products: TInitialStateReducer
}

export interface ThunkConfig {
  state: StateSchema
}

export type TInitialStateReducer = {
  isLoading: boolean,
  productIds: TId[],
  products: TItem[],
  fields: TField[]
}


