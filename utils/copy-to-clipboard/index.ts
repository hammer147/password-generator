import { RefObject } from 'react'

/**
 * Copies the value of the referenced input element to the clipboard
 * @param inputRef 
 */
const copyToClipboard = (inputRef:RefObject<HTMLInputElement>): void => {
  inputRef.current?.select()
  document.execCommand('copy')
  document.getSelection()?.removeAllRanges()
}

export default copyToClipboard
