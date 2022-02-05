# Notes

## forwardRef

This app demonstrates how forwardRef works:

We want to have global access to a certain input element in the display component.

To achieve this we create a ref object in the parent component index.tsx.

```ts

const copyRef = useRef<HTMLInputElement>(null)

```

We then assign it to the special ref attribute of the component that contains the element we want to reference:

```ts
<Display ref={copyRef} />
```

In display.tsx we wrap the function with forwardRef:

```ts
type Props = {}

// forwardRef is a generic function that has type parameters for the type of the ref and the props
// Notice that the ordering of the generic parameters (ref and then props)
// is the opposite of the ordering of the function parameters (props and then ref)
const Display = forwardRef<HTMLInputElement, Props>((props, ref) => {

```

When using forwardRef, we need to set the displayName before exporting.
The fact that our component is called Display is just a coincidence.
If we had a Foo component, it would be Foo.displayName = 'Foo'.

```jsx

Display.displayName = 'Display' // https://github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/display-name.md

export default Display
```

We then assign it to the special ref attribute of the element we want to reference:

```jsx
      <input
        className={styles.passwordDisplayInput}
        type="text"
        value={password}
        readOnly
        ref={ref}
      />
```

The parent element has now access to the referenced element and can pass it as a prop to other components:

```jsx
const copyRef = useRef<HTMLInputElement>(null)

  return (
    <div className={styles.container}>
      <Header />
      <Display ref={copyRef} />
      <Controls copyRef={copyRef} />
    </div>
  )
```

In the component that receives it as a prop:

```ts
type Props = {
  copyRef: RefObject<HTMLInputElement>
}

const Controls = ({ copyRef }: Props) => {
```

## copy to clipboard

There is a couple of ways to copy text to the clipboard.

### using execCommand()

This uses an input element that has to be selected as demonstrated in the function below.
Note that the function has to be called from inside of a click event handler.

```ts
const copyToClipboard = (inputRef:RefObject<HTMLInputElement>): void => {
  inputRef.current?.select()
  document.execCommand('copy')
  document.getSelection()?.removeAllRanges()
}
```

When the button who's click event handler calls the copy function is in a different component than the input element, we need to use forwardRef as described above.

The execCommand way to copy is deprecated, it is recommended to use the Clipboard API.

### using the Clipboard API

This is the recommended way to copy text to the clipboard.

It a lot easier since it doesn't need an input element. You can easily copy a string from state.

It also returns a promise, which makes it easy to give feedback to the user, as in the example below:

```tsx
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
```
