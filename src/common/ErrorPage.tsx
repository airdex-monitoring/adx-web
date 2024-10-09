const ErrorPage = () => {
    return (
        <div className={"w-full h-full flex flex-col justify-center items-center"}>
            <h1 className={"text-4xl font-bold text-red-500"}>404</h1>
            <p className={"text-xl font-semibold text-gray-500"}>Something went wrong</p>
        </div>
    )
}

export default ErrorPage