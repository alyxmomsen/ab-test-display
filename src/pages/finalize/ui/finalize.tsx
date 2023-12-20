import { useNavigate } from "react-router-dom"

export const Finalize = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1>this.is.finalize.page</h1>
            <button onClick={() => {nav('/')}}>go home</button>
        </div>
    )
}