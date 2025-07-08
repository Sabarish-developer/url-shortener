import {useState} from 'react';

export const useFetch = (cb, options={}) => {

    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fn = async(...args) => {
        setLoading(true);
        setError(null);
        try{
            const result = await cb(options, ...args);
            setData(result);
            setError(null);
        }
        catch(e){
            setError(e);
        }
        finally{
            setLoading(false);
        }
    }

    return {fn, data, error, loading};
}