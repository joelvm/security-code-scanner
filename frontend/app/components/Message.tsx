
const Message = (props: { message: string }) => {

    return <div className="bg-teal-100 border-l-4 border-teal-500 text-teal-700 p-4" role="alert">
            <p>{props.message}</p>
        </div>
}
export default Message