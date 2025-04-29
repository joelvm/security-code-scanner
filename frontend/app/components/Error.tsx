
const Error = (props: { message: string }) => {

    return <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4" role="alert">
            <p>{props.message}</p>
        </div>
}
export default Error