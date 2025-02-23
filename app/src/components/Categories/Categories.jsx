import { useNavigate } from "react-router-dom"

export default function Categories() {
    const navigate = useNavigate()
    function go(id) {
        // console.log(id)
        navigate(`/categories/${id}`)
    }
    
    return (
        <div>
            <h2>Раздел Categories</h2>
            <div>
                <ul>
                    <li>Категория 1 <button onClick={() => go(1)}>Посмотреть</button></li>
                    <li>Категория 2 <button onClick={() => go(2)}>Посмотреть</button></li>
                    <li>Категория 3 <button onClick={() => go(3)}>Посмотреть</button></li> 
                </ul>
                <button>Показать подкатегории</button>
            </div>
        </div>
    )
}