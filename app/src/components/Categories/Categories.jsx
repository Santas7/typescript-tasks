import { useNavigate } from "react-router-dom"

export default function Categories() {
    const navigate = useNavigate()
    function go(name) {
        navigate(`/categories/${name}`)
    }
    
    return (
        <div>
            <h2>Категории</h2>
            <div>
                <ul>
                    <li>character <button onClick={() => go("character")}>Посмотреть</button></li>
                    <li>location <button onClick={() => go("location")}>Посмотреть</button></li>
                    <li>episode <button onClick={() => go("episode")}>Посмотреть</button></li> 
                </ul>
                <button>Показать подкатегории</button>
            </div>
        </div>
    )
}