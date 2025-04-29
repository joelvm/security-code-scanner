import { useState, type JSXElementConstructor, type ReactElement, type ReactNode, type ReactPortal } from "react"

export type Option = {
	label: string
    value: string
}

export type SelectProps = {
   label: string
   name: string
   value?: string
   error?: any
   onChange?: (value: string) => void
   required?: boolean
   onBlur?: (value: string) => void
   onFocus?: () => void
   options: Option[]
   className?: string
}

const Select = (props: SelectProps) => {
    const [focus, setFocus] = useState(false)
    const [value, setValue] = useState(props.value)

    return <div className={props.className ?? 'w-full'}>
      <div className="relative">
        <label className={ `px-1 text-sm ${props.error ? 'text-red-800' : 'text-gray-700'}`}>
              {props.label} {props.required && <span className='text-red-800'>*</span>} </label>
        <select value={value} autoComplete="off" name={props.name}
          onBlur={ (e) => { 
            props.onBlur && props.onBlur(e.target.value)
            setFocus(false)
          }} 
          onFocus={ () => { 
            props.onFocus && props.onFocus()
            setFocus(true)
          }} 
          onChange={(e) => {
            props.onChange && props.onChange(e.target.value)
            setValue(e.target.value)
          }}
          className={`w-full appearance-none bg-[url('/arrow-down.svg')] bg-no-repeat bg-right bg-center bg-white text-gray-700 
            border ${props.error ? 'border-red-800' : 'border-gray-300'} rounded-md pb-2 pt-3 pl-2 pr-8 leading-tight focus:outline-none focus:border-purple-700`}
          style={{ zIndex: focus || props.value ? 1 : 2 }}
        >
          {props.options.map( o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
        { props.error && props.error !== 'required' && props.error !== 'Required' && 
          <div className="w-full"><p className="mb-3 ml-2 font-semibold text-red-800">{props.error}</p></div>}
      </div>
    </div>
}

export default Select