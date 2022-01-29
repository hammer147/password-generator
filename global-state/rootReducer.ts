import { initialPasswordState, PasswordAction, passwordReducer, PasswordState } from './password'

export interface RootState {
  password: PasswordState
}

export const initialState: RootState = {
  password: initialPasswordState
}

// union type if we had more features
export type Action = PasswordAction

export const rootReducer = (state: RootState, action: Action): RootState => ({
  ...state,
  password: passwordReducer(state.password, action as PasswordAction)
})
