import { Link } from "react-router-dom"

export const Home = () => {
    return (
        <div>
            <h2>Welcome EveryOne!</h2>
            <p>It is the place here you can store and manage your daily tasks. We are handling these todos very efficiently</p>
            <button className="btn"><Link className="link" to="/managetodo">View your task</Link></button>
        </div>
    )
}