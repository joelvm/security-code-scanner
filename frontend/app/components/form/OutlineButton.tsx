type ButtonProps = {
  label: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  background?: string
  colorHover?: string
};

const OutlineButton = (props: ButtonProps) => {
    return <button className={`rounded-lg border-2 border-purple-700 px-4 py-2 cursor-pointer ml-2 
              hover:border-purple-500 hover:text-purple-500 text-purple-700 flex content-center items-center justify-center`} type={props.type ?? 'submit'}
              onClick={props.onClick}>
            <label className="cursor-pointer">{props.label}</label>
    </button>
}

export default OutlineButton