type ButtonProps = {
  label: string
  item?: string
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  background?: string
  colorHover?: string
};

const Button = (props: ButtonProps) => {
    return <button className={`rounded-lg ${props.background ? props.background : 'bg-purple-700'} px-4 py-2 cursor-pointer 
              shadow-card ml-2 hover:bg-${props.colorHover ?? 'purple-500'}
              hover:shadow-card text-white flex content-center items-center justify-center`} type={props.type ?? 'submit'}
              onClick={props.onClick}>
            {props.item && <i className={props.item + ' mr-2 cursor-pointer'}/>} 
            <label className="cursor-pointer">{props.label}</label>
    </button>
}

export default Button