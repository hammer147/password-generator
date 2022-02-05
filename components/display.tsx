import { forwardRef, useContext, useState } from 'react'
import { FaCheckCircle, FaExclamationTriangle, FaSyncAlt, FaCopy } from 'react-icons/fa'
import useGeneratePassword from '../hooks/generate-password'
import copyToClipBoard from '../utils/copy-to-clipboard'
import { AppContext } from '../global-state/AppContext'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from './display.module.css'

type Props = {}

// forwardRef is a generic function that has type parameters for the type of the ref and the props
// Notice that the ordering of the generic parameters (ref and then props)
// is the opposite of the ordering of the function parameters (props and then ref)
const Display = forwardRef<HTMLInputElement, Props>((props, ref) => {

  // destructure password from state and rename it to passwordParams to avoid a name clash with the generated pw
  const { state: { password: passwordParams } } = useContext(AppContext)

  const [password, strengthDescription] = useGeneratePassword(passwordParams)
  const [, setState] = useState({}) // only used to trigger a re-render (renew password)

  return (
    <div className={`${styles.display} ${styles[strengthDescription]}`}>

      <input
        className={styles.passwordDisplayInput}
        type="text"
        value={password}
        readOnly
        ref={ref}
      />

      <div>
        {strengthDescription === 'Strong' ? <FaCheckCircle /> : <FaExclamationTriangle />}
        {` ${strengthDescription} Password`}
      </div>

      <button
        className={styles.iconButton}
        onClick={() => { setState({}) }}
      >
        <FaSyncAlt />
      </button>

      <button
        className={styles.iconButton}
        // onClick={() => copyToClipBoard(ref as React.RefObject<HTMLInputElement>)}
        onClick={
          () => navigator.clipboard.writeText(password)
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
        <FaCopy />
      </button>

      <ToastContainer />

    </div>
  )
})

Display.displayName = 'Display' // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

export default Display
