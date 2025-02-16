import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }, [navigate])

    return (
        <div>
            <h2 style={{color: 'red'}}>404 Not Found</h2>
        </div>
    );
}