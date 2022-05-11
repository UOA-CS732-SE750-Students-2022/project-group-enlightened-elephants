import { useState, useEffect } from 'react';
import axios from 'axios';

export default function usePost(url, body, initialState = null) {

    const [data, setData] = useState(initialState);
    const [isLoading, setLoading] = useState(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const res = await axios.post(url,body)
            setData(res.data);
            setLoading(false);
        }
        fetchData();
    }, [url]);

    return { data, isLoading };
}
