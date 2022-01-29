import { createContext, Dispatch } from 'react'
import { Action, initialState, RootState } from './rootReducer'

interface AppContext {
  state: RootState
  dispatch: Dispatch<Action>
}

export const AppContext = createContext<AppContext>({
  state: initialState,
  dispatch: () => null
})
