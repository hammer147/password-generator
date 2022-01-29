import { ReactNode, useReducer } from 'react'
import { AppContext } from './AppContext'
import { initialState, rootReducer } from './rootReducer'

type Props = {
  children: ReactNode
}

const AppProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(rootReducer, initialState)
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider
