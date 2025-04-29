import { useState } from "react"

export type InputProps = {
   type?: string
   label: string
   name: string
   value?: string
   error?: any
   onChange?: (value: string) => void
   required?: boolean
   readOnly?: boolean
   onBlur?: (value: string) => void
   onFocus?: () => void
}

const Input = (props: InputProps) => {
    const [focus, setFocus] = useState(false)

    return <div className='w-full'>
      <div className="relative">
        <label className={ `px-1 text-sm ${props.error ? 'text-red-800' : 'text-gray-700'}`}
            style={{ marginTop: focus || props.value ? "-0.6rem" : "0.9rem", zIndex: focus || props.value ? 2 : 1 }}>
              {props.label} {props.required && <span className='text-error'>*</span>} </label>
        <input type={props.type ?? "text" } value={props.value} autoComplete="off" name={props.name} readOnly={!!props.readOnly}
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
          }}
          className={`border ${props.error ? 'border-red-800' : 'border-gray-300'} text-gray-700 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-700`}
          style={{ zIndex: focus || props.value ? 1 : 2 }}
        />
        { props.error && props.error !== 'required' && props.error !== 'Required' && 
          <div className="w-full"><p className="mb-3 ml-2 font-semibold text-red-800">{props.error}</p></div>}
      </div>
    </div>
}

export default Input