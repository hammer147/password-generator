import { PasswordAction } from './actions'
import { ActionTypes } from './types'

export interface PasswordState {
  lowercase: boolean
  uppercase: boolean
  numbers: boolean
  symbols: boolean
  length: number
  [key: string]: boolean | number // makes it indexable, which means we can access properties via bracket notation
}

export const initialPasswordState: PasswordState = {
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
  length: 10
}

export const passwordReducer = (state: PasswordState, action: PasswordAction): PasswordState => {
  switch (action.type) {
    case ActionTypes.toggleLowercase:
      return {...state, lowercase: !state.lowercase}
    case ActionTypes.toggleUppercase:
      return {...state, uppercase: !state.uppercase}
      case ActionTypes.toggleNumbers:
        return {...state, numbers: !state.numbers}
    case ActionTypes.toggleSymbols:
      return {...state, symbols: !state.symbols}
    case ActionTypes.changeLength: 
      return {...state, length: action.payload}
    default:
      return state
  }
}
