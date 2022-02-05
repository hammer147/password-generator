
import { ChangeEventHandler, RefObject, useContext, useEffect, useState } from 'react'
import { AppContext } from '../global-state/AppContext'
import { changeLength, toggleLowercase, toggleNumbers, toggleSymbols, toggleUppercase } from '../global-state/password'
import copyToClipBoard from '../utils/copy-to-clipboard'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './controls.module.css'

const checkboxList = ['lowercase', 'uppercase', 'numbers', 'symbols']

type Props = {
  copyRef: RefObject<HTMLInputElement>
}

const Controls = ({ copyRef }: Props) => {

  const { state: { password }, dispatch } = useContext(AppContext)
  const [checkedBoxes, setCheckedBoxes] = useState(0)

  useEffect(() => {
    let count = 0
    checkboxList.forEach(checkbox => {
      if (password[checkbox]) count++
    })
    setCheckedBoxes(count)
  }, [password])

  const handleChangeSlider: ChangeEventHandler<HTMLInputElement> = e => {
    dispatch(changeLength(+e.target.value))
  }

  const handleChangeCheckbox: ChangeEventHandler<HTMLInputElement> = e => {
    switch (e.target.name) {
      case 'uppercase':
        return dispatch(toggleUppercase())
      case 'lowercase':
        return dispatch(toggleLowercase())
      case 'symbols':
        return dispatch(toggleSymbols())
      case 'numbers':
        return dispatch(toggleNumbers())
      default:
        return
    }
  }

  return (
    <div className={styles.controls}>

      <div className={styles.slider}>
        <input
          type="range"
          className={styles.sliderRange}
          min={4}
          max={20}
          step={1}
          value={password.length}
          onChange={handleChangeSlider}
        />
        <span className={styles.sliderValue}>{password.length}</span>
      </div>

      <div className={styles.checkboxGroup}>
        {checkboxList.map(checkbox => (
          <div key={checkbox}>
            <label>{checkbox[0].toUpperCase() + checkbox.slice(1)}</label>
            <input
              type="checkbox"
              name={checkbox}
              checked={!!password[checkbox]}
              disabled={password[checkbox] && checkedBoxes === 1 ? true : false}
              onChange={handleChangeCheckbox}
            />
          </div>
        ))}
      </div>

      <button
        className={styles.copyButton}
        // onClick={() => copyToClipBoard(copyRef as RefObject<HTMLInputElement>)}
        onClick={
          // normally we wouldn't use a ref to get the text to copy in the method below (Clipboard API)
          // we would lift the state that holds the password and pass that as a prop
          // or we could put it in global state and use context
          // fyi the password feature that is now in global state is not the password itself but a description of its properties
          () => navigator.clipboard.writeText(copyRef.current?.value!)
            .then(() => {
              toast.dismiss()
              toast.success('successfully copied to clipboard')
            })
            .catch(()=> {
              toast.dismiss()
              toast.error('copy to clipboard failed')
            })
        }
      >
        Copy Password
      </button>

      <ToastContainer />

    </div>
  )
}

export default Controls
