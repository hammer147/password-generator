
import { ChangeEventHandler, RefObject, useContext, useEffect, useState } from 'react'
import { AppContext } from '../global-state/AppContext'
import { changeLength, toggleLowercase, toggleNumbers, toggleSymbols, toggleUppercase } from '../global-state/password'
import copyToClipBoard from '../utils/copy-to-clipboard'
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
        onClick={() => copyToClipBoard(copyRef as RefObject<HTMLInputElement>)}
      >
        Copy Password
      </button>

    </div>
  )
}

export default Controls
