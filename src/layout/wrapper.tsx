import Error from "./error"
import Spinner from "./spinner"

interface WrapperProps {
    error: boolean
    errorHeight: string;
    isLoading: boolean
    children: React.ReactNode
}

const Wrapper = ({ error, errorHeight, isLoading, children }: WrapperProps) => {
    if (error) {
        return <Error height={errorHeight} />
    }

    if (!isLoading) {
        return <Spinner height={String(errorHeight)} />
    }

    return <>{children}</>
}

export { Error, Wrapper }