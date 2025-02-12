import { useEffect, useState } from "react";

export function useFetch(initLink = '') {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [link, setLink] = useState(initLink);

    const refetch = (object = {params: {_limit: 1}}) => {
        const {params} = object;
        const newLink = `${link}?_limit=${params._limit}`;
        setData(null);
        setError(null);
        setIsLoading(true);
        setLink(newLink);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            try {
                // throw new Error('Произошла ошибка');
                const response = await fetch(link);
                const data = await response.json();
                setData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setIsLoading(false);
            }
        };
        fetchData();
    }, [link]);
    return { data, isLoading, error, refetch };
}