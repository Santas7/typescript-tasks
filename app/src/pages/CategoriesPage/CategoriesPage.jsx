import ListItems from "../../components/ListItems/ListItems"

export default function CategoriesPage() {

    return (
        <div>
            <h2>Категории</h2>
            <div>
                <ListItems/>
                <button>Показать подкатегории</button>
            </div>
        </div>
    )
}