import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

export default function Navbar() {
    const { user, signout } = useAuth()
    const navigate = useNavigate()
    
    function handleClick() {
        signout(() => navigate('/signin'))
    }

    return (
      <nav>
        <Link to="/categories">Категории</Link>
        {user 
            ? <button onClick={handleClick}>Выйти</button>
            : <Link to="/signin">Войти</Link>
        }
      </nav>
    )
}