type ButtonProps = {
  label: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  background?: string
  colorHover?: string
};

const Button = (props: ButtonProps) => {
    return <button type={props.type ?? 'submit'} className={`rounded-lg bg-purple-700 px-4 py-2 cursor-pointer ml-2 
              hover:bg-purple-500 hover:shadow-card text-white flex content-center items-center justify-center`} 
              onClick={props.onClick}>
            <label className="cursor-pointer">{props.label}</label>
    </button>
}

export default Button