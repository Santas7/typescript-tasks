import { useNavigate } from "react-router-dom"
import ListItem from "./ListItem/ListItem"

export default function ListItems() {
    const navigate = useNavigate()
    function handleClick(name) {
        navigate(`/categories/${name}`)
    }
    return (
        <ul>
            <ListItem typeCategory="character" handleClick={handleClick} />
            <ListItem typeCategory="location" handleClick={handleClick} />
            <ListItem typeCategory="episode" handleClick={handleClick} />
        </ul>
    )
}