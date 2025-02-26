export default function ListItem({
    typeCategory,
    handleClick
}) {
    return (
        <li>
            {typeCategory} 
            <button onClick={() => handleClick(typeCategory)}>Посмотреть</button>
        </li>
    )
}