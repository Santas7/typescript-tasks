import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";


export default function CategoryPage() {
    const location = useLocation();
    const navigate = useNavigate()
    const pathname = location.pathname.split('/');
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    
    function handleClick(item) {
        navigate(`/categories/${pathname[2]}/${item.id}`)
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const module = await import(`../../assets/${pathname[2]}.json`);
            console.log(module)
            setData(module.default); 
          } catch (error) {
            console.error("Error loading JSON data", error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchData();
    }, [pathname[2]]);
    
    if (loading) {
        return <h2>Загрузка данных...</h2>; 
    }
    return (
        <div>
            <h2>Category <mark>{pathname[2]}</mark></h2>
            <ul>
                {data.map((item: any) => (
                <li key={item.id} className="card" onClick={() => {handleClick(item)}}>
                    <p>{item.name}</p>
                    {item.created && <p style={{color: 'gray'}}>{item.created}</p>}
                </li>
                ))}
            </ul>
        </div>
    );
}