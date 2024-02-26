import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { ReducersMapObject, configureStore } from '@reduxjs/toolkit'
import { StateSchema } from './types'
import { productsReducer, reducer } from './reducer/reducer'


interface StoreProviderProps {
    initialState?: any // DeepPartial для Storybook
    children?: ReactNode
}

export type RootState = StateSchema

const rootReducer: ReducersMapObject<RootState> = {
    products: productsReducer
}


export function createReduxStore(initialState: RootState) {

    return configureStore({
        reducer: rootReducer,

        preloadedState: initialState,
    })
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch']


export const StoreProvider = (props: StoreProviderProps) => {
    const { initialState, children } = props

    const store = createReduxStore(initialState as StateSchema) // кастуем DeepPartial

    return <Provider store={store}>{children}</Provider>
}
