import { ActionTypes } from './types'

// typing actions

interface ToggleLowercaseAction { type: ActionTypes.toggleLowercase }
interface ToggleUppercaseAction { type: ActionTypes.toggleUppercase }
interface ToggleNumbersAction { type: ActionTypes.toggleNumbers }
interface ToggleSymbolsAction { type: ActionTypes.toggleSymbols }
interface ChangeLengthAction {
  type: ActionTypes.changeLength
  payload: number
}

// discriminated union

export type PasswordAction =
  | ToggleLowercaseAction
  | ToggleUppercaseAction
  | ToggleNumbersAction
  | ToggleSymbolsAction
  | ChangeLengthAction

// action creators

export const toggleLowercase = (): ToggleLowercaseAction => ({ type: ActionTypes.toggleLowercase })
export const toggleUppercase = (): ToggleUppercaseAction => ({ type: ActionTypes.toggleUppercase })
export const toggleNumbers = (): ToggleNumbersAction => ({ type: ActionTypes.toggleNumbers })
export const toggleSymbols = (): ToggleSymbolsAction => ({ type: ActionTypes.toggleSymbols })
export const changeLength = (length: number): ChangeLengthAction => ({
  type: ActionTypes.changeLength,
  payload: length
})
