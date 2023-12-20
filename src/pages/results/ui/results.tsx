import { useNavigate } from "react-router-dom"

export const Results = () => {

    const nav = useNavigate() ;

    return (
        <div>
            <h1>this.is.results.page</h1>
            <button onClick={() => {nav('/')}}>go home</button>
        </div>
    )
}