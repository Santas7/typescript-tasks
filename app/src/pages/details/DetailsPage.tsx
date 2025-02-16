import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function DetailsPage() {

    const location = useLocation();
    
    const pathname = location.pathname.split('/');
    const [data, setData] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(true);
    const id = pathname[3]

    useEffect(() => {
        const fetchData = async () => {
          try {
            const module = await import(`../../assets/${pathname[2]}.json`);
            console.log(module)
            
            setData(module.default[id]); 
          } catch (error) {
            console.error("Error loading JSON data", error);
          } finally {
            setLoading(false); 
          }
        };
    
        fetchData();
    }, [pathname[2]]);

    return (
        <div>
            <h2>Details {id}</h2>
            <div>
                {data.image && <img src={data.image} alt={data.name}/>}
                <div>
                    <h3>{data.name}</h3>
                    {data.type && <p><strong>Type:</strong> {data.type}</p>}
                    {data.status && <p><strong>Status:</strong> {data.status}</p>}
                    {data.air_date && <p><strong>Air Date:</strong> {data.air_date}</p>}
                    {data.dimension && <p><strong>Dimension:</strong> {data.dimension}</p>}
                    {data.episode && <p><strong>Episode:</strong> {data.episode}</p>}
                    {data.species && <p><strong>Species:</strong> {data.species}</p>}
                    {data.gender && <p><strong>Gender:</strong> {data.gender}</p>}
                    {data.created && <p><strong>Created:</strong> {new Date(data.created).toLocaleDateString()}</p>}
                </div>
            </div>
        </div>
    );
}