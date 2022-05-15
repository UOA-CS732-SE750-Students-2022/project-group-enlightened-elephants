import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useGet(url, initialState = null) {

    const [data, setData] = useState(initialState);
    const [status, setStatus] = useState(0)
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const response = await axios.get(url);
            setData(response.data);
            setStatus(response.status);
            setLoading(false);
        }
        fetchData();
    }, [url]);

    return { status, data, isLoading };
}